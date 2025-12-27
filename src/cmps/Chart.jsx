import { Bar, Doughnut, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export function Chart({ data, chartType }) {
  const options = {
    plugins: {
      legend: {
        display: false,
        font: {
          size: 24
        }
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 16
          }
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 10
    },
    plugins: {
      legend: {
        position: 'left',
        align: 'center',
        labels: {
          font: {
            size: 14
          },
          padding: 12,
          boxWidth: 15,
          boxHeight: 15,
          usePointStyle: true,
          pointStyle: 'rectRounded'
        }
      },
    },
  }

  return (
    <section className="chart">
      {chartType === 'bar' && <Bar data={data} options={options} />}
      {chartType === 'doughnut' && <Doughnut data={data} options={pieOptions} />}
      {chartType === 'pie' && <Pie data={data} options={pieOptions} />}
    </section>
  )
}