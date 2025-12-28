import { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders } from '../store/actions/order.actions'
import { Chart } from './Chart'

export function DashboardAnalytics() {
    const [chartData, setChartData] = useState(null)
    const loggedInUser = useSelector((state) => state.userModule.user)
    const allOrders = useSelector((state) => state.orderModule.orders)

    const orders = useMemo(() => {
        return allOrders.filter((order) => order.hostId._id === loggedInUser?._id)
    }, [allOrders, loggedInUser])

    useEffect(() => {
        if (!orders.length) {
            loadOrders()
        }
    }, [])

    useEffect(() => {
        if (orders.length > 0) {
            setChartData(prepareChartData(orders))
        }
    }, [orders])

    function prepareChartData(orders) {
        const months = []
        const monthLabels = []
        const now = new Date()

        for (let i = 4; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
            const monthKey = date.toLocaleDateString('en-US', { month: 'short' })
            months.push(monthKey)
            monthLabels.push(monthKey)
        }

        const monthlyRevenue = {}
        const statusCount = { pending: 0, approved: 0, rejected: 0 }
        const listingReservations = {}

        orders.forEach((order) => {
            const date = new Date(order.bookDate)
            const monthKey = date.toLocaleDateString('en-US', { month: 'short' })

            if (order.status === 'approved') {
                if (!monthlyRevenue[monthKey]) monthlyRevenue[monthKey] = 0
                monthlyRevenue[monthKey] += order.totalPrice
            }

            statusCount[order.status] = (statusCount[order.status] || 0) + 1

            const listingName = order.stay.name
            listingReservations[listingName] = (listingReservations[listingName] || 0) + 1
        })

        const revenueData = months.map((month) => monthlyRevenue[month] || 0)

        const createGradient = (ctx, chartArea) => {
            if (!chartArea) return null
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
            gradient.addColorStop(0, 'rgb(189, 30, 89)')
            gradient.addColorStop(0.25, 'rgb(215, 4, 102)')
            gradient.addColorStop(0.5, 'rgb(227, 28, 95)')
            gradient.addColorStop(0.75, 'rgb(230, 30, 77)')
            gradient.addColorStop(1, 'rgb(255, 56, 92)')
            return gradient
        }

        const revenueChartData = {
            labels: monthLabels,
            datasets: [
                {
                    data: revenueData,
                    backgroundColor: (context) => {
                        const chart = context.chart
                        const { ctx, chartArea } = chart
                        if (!chartArea) return null
                        return createGradient(ctx, chartArea)
                    },
                },
            ],
        }

        const listingChartData = {
            labels: Object.keys(listingReservations),
            datasets: [
                {
                    data: Object.values(listingReservations),
                    backgroundColor: [
                        'rgb(255, 56, 92)',
                        'rgb(236, 72, 153)',
                        'rgb(219, 39, 119)',
                        'rgb(190, 18, 60)',
                        'rgb(157, 23, 77)'
                    ],
                },
            ],
        }

        return { revenueChartData, statusCount, listingChartData }
    }

    if (!chartData) return null

    return (
        <div className="dashboard-analytics">
            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h2>Revenue / month</h2>
                    <Chart data={chartData.revenueChartData} chartType="bar" />
                </div>

                <div className="dashboard-card">
                    <h2>Reservations status</h2>
                    <div className="status-list">
                        <div className="status-item">
                            <span>Pending</span>
                            <span className="status-count pending">
                                {chartData.statusCount.pending}
                            </span>
                        </div>
                        <div className="status-item">
                            <span>Approved</span>
                            <span className="status-count approved">
                                {chartData.statusCount.approved}
                            </span>
                        </div>
                        <div className="status-item">
                            <span>Rejected</span>
                            <span className="status-count rejected">
                                {chartData.statusCount.rejected}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-card">
                    <h2>Reservations / listing</h2>
                    <Chart data={chartData.listingChartData} chartType="pie" />
                </div>
            </div>
        </div>
    )
}
