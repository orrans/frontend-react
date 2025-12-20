import { Link, NavLink, useNavigate } from 'react-router-dom'
import { StaySearch } from './StaySearch.jsx'

export function AppHeader() {
    const navigate = useNavigate()

    return (
        <header className="app-header full">
            <div className="header-container">

                {/* Top Row: Logo, Nav, User Actions */}
                <div className="header-top">
                    <div className="logo">
                        <Link to="/">
                            <h1 className="logo-text">PlatypusBNB</h1>
                        </Link>
                    </div>

                    <nav className="main-nav">
                        <NavLink to="/" className="nav-link">Homes</NavLink>
                        <NavLink to="/experiences" className="nav-link">Experiences</NavLink>
                        <NavLink to="/online" className="nav-link">Services</NavLink>
                    </nav>

                    <div className="user-actions">
                        <button className="host-btn">Become a Host</button>

                        <div className="user-avatar-placeholder" onClick={() => navigate('/user/profile')}>
                            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="presentation" focusable="false" style={{ display: 'block', height: '100%', width: '100%', fill: 'currentcolor' }}><path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path></svg>
                        </div>

                        <div className="user-menu-btn">
                            <div className="menu-toggle-btn">
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: '3', overflow: 'visible' }}><g fill="none"><path d="m2 16h28"></path><path d="m2 24h28"></path><path d="m2 8h28"></path></g></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Search Bar */}
                <div className="header-bottom">
                    <StaySearch />
                </div>
            </div>
        </header>
    )
}