import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { StaySearch } from './StaySearch.jsx'
import { LoginModal } from './LoginModal.jsx'
import { logout } from '../store/actions/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function AppHeader() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const menuRef = useRef(null)
    const user = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false)
            }
        }

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isMenuOpen])

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('Bye now')
            setIsMenuOpen(false)
            navigate('/')
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    // Hide search bar on profile page
    const isUserProfile = location.pathname.includes('/user/profile')

    return (
        <header className={`app-header full ${isUserProfile ? 'compact' : ''}`}>
            <div className="header-container">

                {/* Top Row: Logo, Nav, User Actions */}
                <div className="header-top">
                    <div className="logo">
                        <Link to="/">
                            <h1 className="logo-text">PlatypusBNB</h1>
                        </Link>
                    </div>

                    {!isUserProfile && (
                        <nav className="main-nav">
                            <NavLink to="/" className="nav-link">
                                <video
                                    className="simi9jf atm_jp_1f51e7f atm_jr_1h6ojuz atm_vy_1osqo2v atm_e2_1osqo2v atm_tr_18ws4an atm_mj_glywfm slt01p9 atm_mk_stnw88 atm_tk_idpfg4 atm_fq_idpfg4 stz1the atm_k4_kb7nvz dir dir-ltr"
                                    playsInline
                                    poster="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/4aae4ed7-5939-4e76-b100-e69440ebeae4.png?im_w=240"
                                    preload="auto"
                                ></video>
                                Homes
                            </NavLink>
                        </nav>
                    )}

                    <div className="user-actions">
                        <button className="host-btn">Become a Host</button>

                        <div className="user-avatar-placeholder" onClick={() => navigate('/user/profile')}>
                            {user && user.imgUrl ? (
                                <img src={user.imgUrl} alt={user.fullname} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                            ) : (
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="presentation" focusable="false" style={{ display: 'block', height: '100%', width: '100%', fill: 'currentcolor' }}><path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path></svg>
                            )}
                        </div>

                        <div className="user-menu-btn" ref={menuRef}>
                            <div className="menu-toggle-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: '3', overflow: 'visible' }}><g fill="none"><path d="m2 16h28"></path><path d="m2 24h28"></path><path d="m2 8h28"></path></g></svg>
                            </div>
                            {isMenuOpen && (
                                <div className="user-nav-modal">
                                    {user ? (
                                        <>
                                            <Link to="#" className="nav-item">Wishlists</Link>

                                            <Link
                                                to="/trips"
                                                className="nav-item"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Trips
                                            </Link>
                                            {/* <Link to="#" className="nav-item">Trips</Link> */}
                                            <Link to="#" className="nav-item">Profiles</Link>
                                            <div className="divider"></div>
                                            <Link to="#" onClick={onLogout} className="nav-item">Log out</Link>
                                        </>
                                    ) : (
                                        <Link to="#" onClick={() => {
                                            setIsMenuOpen(false)
                                            setIsLoginModalOpen(true)
                                        }} className="nav-item">Log in</Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Search Bar */}
                {!isUserProfile && (
                    <div className="header-bottom">
                        <StaySearch />
                    </div>
                )}

                {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
            </div>
        </header>
    )
}