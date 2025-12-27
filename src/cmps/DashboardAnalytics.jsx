import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders } from '../store/actions/order.actions'
import { Chart } from './Chart'

export function DashboardAnalytics() {
    const [chartData, setChartData] = useState(null)
    const loggedInUser = useSelector((state) => state.userModule.user)
    const orders = useSelector(
        (state) =>
            state.orderModule.orders.filter((order) => order.hostId._id === loggedInUser?._id)
    )

    useEffect(() => {
        if (!orders.length) {
            loadOrders()
        }
    }, [])

    useEffect(() => {
        if (orders.length > 0) {
            setChartData(prepareChartData(orders))
        }
    }, [orders.length])

    function prepareChartData(orders) {
        // Generate last 5 months dynamically (current month + 4 previous)
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

        orders.forEach(order => {
            const date = new Date(order.startDate)
            const monthKey = date.toLocaleDateString('en-US', { month: 'short' })
            
            if (!monthlyRevenue[monthKey]) monthlyRevenue[monthKey] = 0
            monthlyRevenue[monthKey] += order.totalPrice

            statusCount[order.status] = (statusCount[order.status] || 0) + 1

            const listingName = order.stay.name
            listingReservations[listingName] = (listingReservations[listingName] || 0) + 1
        })

        const revenueData = months.map(month => monthlyRevenue[month] || 0)

        const revenueChartData = {
            labels: monthLabels,
            datasets: [{
                data: revenueData,
                backgroundColor: [
                    '#8b5cf6',
                    '#3b82f6',
                    '#60a5fa',
                    '#22d3ee',
                    '#2dd4bf'
                ],
            }]
        }

        const listingChartData = {
            labels: Object.keys(listingReservations),
            datasets: [{
                data: Object.values(listingReservations),
                backgroundColor: [
                    '#8b5cf6',
                    '#3b82f6',
                    '#60a5fa',
                    '#22d3ee'
                ],
            }]
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
                            <span className="status-count pending">{chartData.statusCount.pending}</span>
                        </div>
                        <div className="status-item">
                            <span>Approved</span>
                            <span className="status-count approved">{chartData.statusCount.approved}</span>
                        </div>
                        <div className="status-item">
                            <span>Rejected</span>
                            <span className="status-count rejected">{chartData.statusCount.rejected}</span>
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
