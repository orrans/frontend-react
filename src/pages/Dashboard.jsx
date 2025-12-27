import { Outlet, NavLink } from 'react-router-dom'
import '../assets/styles/pages/Dashboard.css'

export function Dashboard() {
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <NavLink to="orders" className={({ isActive }) => isActive ? 'active' : ''}>
          Reservations
        </NavLink>
        <NavLink to="listing" className={({ isActive }) => isActive ? 'active' : ''}>
          Listings
        </NavLink>
      </nav>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  )
}