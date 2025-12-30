import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { StaySearch } from './StaySearch.jsx'
import { StaySearchCollapsed } from './StaySearchCollapsed.jsx'
import { LoginModal } from './LoginModal.jsx'
import { logout } from '../store/actions/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useIsMobile } from '../customHooks/useIsMobile.js'

export function AppHeader() {
    const navigate = useNavigate()
    const location = useLocation()
    const user = useSelector((storeState) => storeState.userModule.user)
    const isMobile = useIsMobile()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isSearchExpanded, setIsSearchExpanded] = useState(false)
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)

    const menuRef = useRef(null)

    useEffect(() => {
        function handleScroll() {
            setIsScrolled(window.scrollY > 0)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (!isSearchExpanded) return

        function onScrollClose() {
            setIsSearchExpanded(false)
            setIsOverlayOpen(false)
        }

        const timeoutId = setTimeout(() => {
            window.addEventListener('scroll', onScrollClose, { passive: true })
        }, 300)

        return () => {
            clearTimeout(timeoutId)
            window.removeEventListener('scroll', onScrollClose)
        }
    }, [isSearchExpanded])

    useEffect(() => {
        if (location.pathname === '/') {
            setIsScrolled(false)
            setIsSearchExpanded(false)
        } else {
            setIsScrolled(true)
            setIsSearchExpanded(false)
        }
        setIsOverlayOpen(false)
    }, [location.pathname])

    function onToggleSearch() {
        setIsSearchExpanded(true)
        setIsOverlayOpen(true)
    }

    function onSearchFocus(isActive) {
        setIsOverlayOpen(isActive)
    }

    function onSearchCompleted() {
        setIsSearchExpanded(false)
        setIsOverlayOpen(false)
    }

    function onOverlayClick() {
        setIsOverlayOpen(false)
        setIsSearchExpanded(false)
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false)
            }
        }
        if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isMenuOpen])

    async function onLogout() {
        try {
            await logout()
            setIsMenuOpen(false)
            navigate('/')
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    const isUserProfile = location.pathname.includes('/user/profile')
    const isHomePage = location.pathname === '/'

    const showLargeSearch =
        !isUserProfile && ((isHomePage && !isScrolled) || isSearchExpanded || isOverlayOpen)
    const showSmallSearch = !isUserProfile && !showLargeSearch

    return (
        <>
            <div
                className={`main-layout-overlay ${isOverlayOpen ? 'open' : ''}`}
                onClick={onOverlayClick}></div>

            <header className={`app-header full ${!showLargeSearch ? 'compact' : ''}`}>
                <div className="header-container">
                    <div className="header-top">
                        <div className="logo">
                            <Link to="/">
                                <h1 className="logo-text">PlatypusBNB</h1>
                            </Link>
                        </div>

                        {!isUserProfile && (
                            <nav className="main-nav">
                                {showSmallSearch ? (
                                    <StaySearchCollapsed onToggleSearch={onToggleSearch} />
                                ) : (
                                    <NavLink to="/" className="nav-link">
                                        <video
                                            className="logo-video"
                                            playsInline
                                            poster="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/4aae4ed7-5939-4e76-b100-e69440ebeae4.png?im_w=240"
                                            preload="auto"
                                            style={{ width: '65px', height: '65px' }}></video>
                                        <span style={{ fontWeight: 600 }}>Homes</span>
                                    </NavLink>
                                )}
                            </nav>
                        )}

                        <div className="user-actions">
                            {!isMobile && <button className="host-btn">Become a Host</button>}
                            <div
                                className="user-avatar-placeholder"
                                onClick={() => navigate('/user/profile')}>
                                {user && user.imgUrl ? (
                                    <img
                                        src={user.imgUrl}
                                        alt={user.fullname}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                ) : (
                                    <svg
                                        viewBox="0 0 32 32"
                                        xmlns="http://www.w3.org/2000/svg"
                                        role="presentation"
                                        focusable="false"
                                        style={{
                                            display: 'block',
                                            height: '100%',
                                            width: '100%',
                                            fill: 'currentcolor',
                                        }}>
                                        <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                                    </svg>
                                )}
                            </div>

                            <div className="user-menu-btn" ref={menuRef}>
                                <div
                                    className="menu-toggle-btn"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                    <svg
                                        viewBox="0 0 32 32"
                                        xmlns="http://www.w3.org/2000/svg"
                                        role="presentation"
                                        focusable="false"
                                        style={{
                                            display: 'block',
                                            fill: 'none',
                                            height: '16px',
                                            width: '16px',
                                            stroke: 'currentcolor',
                                            strokeWidth: '3',
                                            overflow: 'visible',
                                        }}>
                                        <g fill="none">
                                            <path d="m2 16h28"></path>
                                            <path d="m2 24h28"></path>
                                            <path d="m2 8h28"></path>
                                        </g>
                                    </svg>
                                </div>
                                {isMenuOpen && (
                                    <div className="user-nav-modal">
                                        {user ? (
                                            <>
                                                <Link
                                                    to="/wishlist"
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="nav-item">
                                                    <svg
                                                        viewBox="0 0 16 16"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        aria-hidden="true"
                                                        role="presentation"
                                                        focusable="false"
                                                        style={{
                                                            display: 'block',
                                                            height: '16px',
                                                            width: '16px',
                                                            fill: 'currentcolor',
                                                        }}>
                                                        <path d="m1.2818 2.28128c.85365-.85366 1.97488-1.28128 3.0932-1.28128 1.11895 0 2.23951.42769 3.09353 1.28108l.5316.53186.53167-.53166c.85365-.85366 1.9749-1.28128 3.0932-1.28128 1.1189 0 2.2395.42769 3.0935 1.28108.8543.85427 1.2815 1.97522 1.2815 3.09392 0 2.08131-1.0445 3.84508-2.47 5.3566-1.4224 1.5083-3.2985 2.8435-5.10991 4.0683l-.42009.284-.42009-.284c-1.81143-1.2248-3.68747-2.56-5.10991-4.0683-1.42552-1.51152-2.47-3.27529-2.47-5.3566 0-1.11898.42772-2.23965 1.2818-3.09372zm3.0932.21872c-.73664 0-1.47141.2808-2.03254.84194-.56175.56174-.84246 1.29604-.84246 2.03306 0 1.54369.76802 2.9562 2.06125 4.32745 1.19589 1.26805 2.77704 2.43355 4.43875 3.56935 1.66171-1.1358 3.2429-2.3013 4.4387-3.56935 1.2933-1.37125 2.0613-2.78376 2.0613-4.32745 0-.73722-.2803-1.47134-.8417-2.03287-.5618-.56139-1.2962-.84213-2.0333-.84213-.7366 0-1.4714.2808-2.03255.84194l-1.59258 1.59258-1.59161-1.59239c-.00004-.00004.00004.00004 0 0-.56179-.56131-1.29626-.84213-2.03326-.84213z"></path>
                                                    </svg>
                                                    Wishlists
                                                </Link>
                                                <Link
                                                    to="/trips"
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="nav-item">
                                                    <svg
                                                        viewBox="0 0 16 16"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        aria-hidden="true"
                                                        role="presentation"
                                                        focusable="false"
                                                        style={{
                                                            display: 'block',
                                                            height: '16px',
                                                            width: '16px',
                                                            fill: 'currentcolor',
                                                        }}>
                                                        <path d="m8.00073 0c.85717946 0 1.62684857.35868406 2.1937409 1.02111646.2144549.250393.3758172.50708704.5897698.90417524.1084074.20131099.1963609.36989452.3797964.72532738 1.2433329 2.40675294 2.3962717 4.7612525 3.4755542 7.0962851.1950198.42156252.2752302.59680512.3743446.82094232.1050003.2370422.1738479.4040286.2354061.5766617.2194417.6162554.2838241 1.196706.1976325 1.7982695-.1796206 1.2499866-1.0174863 2.3187992-2.1889184 2.792567-.5672648.2297606-1.1848002.3112029-1.8073827.2392705-.5633746-.0652795-1.1095514-.2496272-1.65877145-.5578976-.53265006-.2989748-1.05709049-.7092405-1.60515387-1.2555416l-.18617062-.191176-.18594335.1912336c-.46978467.4682367-.92218332.8365305-1.37724643 1.1204663l-.22784641.1350103c-.54926079.308313-1.09535461.4926387-1.65901377.5579269-.62199187.0719117-1.23973216-.0095182-1.80687977-.2390896-1.17190667-.4741621-2.00972658-1.5430311-2.18907724-2.7929048-.08638383-.6013502-.02194043-1.1819588.19756054-1.7978463.06140475-.1725876.13004738-.3392185.23519522-.5767516.09772705-.2207952.18174064-.4044611.35845465-.78652908 1.08753525-2.35277766 2.23949411-4.70706132 3.44034564-7.03160619.23277409-.45121857.31899024-.61666413.43109963-.82476319.21409858-.39705137.37508025-.65321337.58908218-.90340207.56726217-.66293038 1.33704798-1.02174427 2.19442165-1.02174427zm0 1.5c-.41645869 0-.7707877.16516045-1.05462633.49686817-.1279564.14959327-.24125849.32988516-.40845452.63995442l-.06930987.12952374c-.08127093.15299181-.1714733.32685659-.34934074.67164173-1.19101502 2.30550412-2.33333542 4.64008945-3.41171336 6.97305614-.17334994.3747947-.25501929.5533357-.34832461.7641408-.09129539.2062399-.14714141.3418069-.19374753.4728003-.13958391.3916522-.17679809.7269367-.12586736 1.0814846.1034749.7211045.58988597 1.3416551 1.26701124 1.615625.33263914.1346465.69754717.1827483 1.07173808.1394862.35959164-.0416512.7162238-.1620271 1.09722297-.3758909.52812534-.2964499 1.07769912-.7617651 1.69846852-1.4505401l-.13920903.1498499-.01886004-.0215446.00786004-.0094554-.07709277-.098045c-.79344026-1.0340817-1.34644353-2.0815119-1.61565651-3.04822779l-.06635303-.26157794c-.1123801-.49221869-.1382651-.96386534-.0701739-1.40485199.06388898-.41431204.19450137-.74424964.42713776-1.08263364.51985379-.75607303 1.40816582-1.17598364 2.37928099-1.17598364.97141827 0 1.85950763.41994966 2.3793876 1.17618319.2339786.34030872.384814.73026096.4500325 1.15346303.0680737.44148456.0420652.91335016-.0705092 1.405549-.2471395 1.08085008-.8970543 2.25073598-1.93022828 3.52360488l.12917484-.1644801.07135262.0772016c.47276649.4996475.90424939.8660085 1.31924512 1.1263264l.1769182.1051518c.3809759.213837.7377229.3342477 1.0969879.3758766.3746623.0432879.7392965-.0048011 1.0722195-.1396456.6768342-.2737353 1.1632875-.8942731 1.266881-1.6151839.0508235-.3547167.0136161-.6901671-.1258131-1.0817245-.0466004-.1306854-.102691-.2667304-.1940962-.4730816l-.0699169-.1568774c-.0708581-.157662-.1506404-.3311383-.2942503-.6415712-1.0700844-2.31513242-2.2133777-4.6499341-3.44688122-7.03766022-.12826779-.24853733-.20838925-.40287529-.28116567-.54034895l-.08641736-.16182296c-.16693991-.30983427-.2803131-.4901876-.40862873-.64000633-.28373853-.33155776-.63796079-.49663374-1.05428232-.49663374zm-1.14324632 6.23148337c-.10460715.15215756-.15114223.26970899-.18072743.4615652-.03758558.24341972-.02206677.52618563.05007686.84217076.16791319.73521241.57934148 1.58483277 1.20538743 2.45565817l.07035692.0951225.05446403-.0719234c.60652746-.8198483 1.0034085-1.56177296 1.19050314-2.21447418l.04983466-.19312236c.07226743-.31596838.08785953-.59885201.05027106-.84262801-.03149873-.2043947-.10001512-.381529-.20360348-.53219243-.22551309-.32803836-.64410975-.52597962-1.14332687-.52597962-.49899698 0-.91784176.19799052-1.14323632.52580337z"></path>
                                                    </svg>
                                                    Trips
                                                </Link>
                                                <Link
                                                    to="/user/profile"
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="nav-item">
                                                    <svg
                                                        viewBox="0 0 16 16"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        aria-hidden="true"
                                                        role="presentation"
                                                        focusable="false"
                                                        style={{
                                                            display: 'block',
                                                            height: '16px',
                                                            width: '16px',
                                                            fill: 'currentcolor',
                                                        }}>
                                                        <path
                                                            d="m8 0c4.4183 0 8 3.58172 8 8 0 4.4183-3.5817 8-8 8-4.41828 0-8-3.5817-8-8 0-4.41828 3.58172-8 8-8zm.00052 11.5c-1.55234 0-2.95811.6253-3.98006 1.6398 1.09966.8526 2.48033 1.3602 3.97954 1.3602 1.49949 0 2.8804-.5077 3.9801-1.3607-1.0219-1.0141-2.42753-1.6393-3.97958-1.6393zm-.00052-10c-3.58985 0-6.5 2.91015-6.5 6.5 0 1.55014.54263 2.9735 1.44831 4.0906 1.29288-1.2909 3.07941-2.0906 5.05221-2.0906 1.97257 0 3.75878.7994 5.05168 2.09.9054-1.1169 1.4478-2.54013 1.4478-4.09 0-3.58985-2.9102-6.5-6.5-6.5zm.00024 1.75c1.65688 0 2.99996 1.34315 2.99996 3 0 1.65687-1.34308 3-2.99996 3-1.65685 0-3-1.34312-3-3 0-1.65686 1.34315-3 3-3zm0 1.5c-.82842 0-1.5.67157-1.5 1.5 0 .82844.67157 1.5 1.5 1.5.82845 0 1.5-.67155 1.5-1.5 0-.82843-.67155-1.5-1.5-1.5z"
                                                            fillRule="evenodd"></path>
                                                    </svg>
                                                    Profile
                                                </Link>
                                                <Link
                                                    to="/dashboard"
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="nav-item">
                                                    <svg
                                                        viewBox="0 0 16 16"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        aria-hidden="true"
                                                        role="presentation"
                                                        focusable="false"
                                                        style={{
                                                            display: 'block',
                                                            height: '16px',
                                                            width: '16px',
                                                            fill: 'currentcolor',
                                                        }}>
                                                        <path d="M1 1h6v6H1V1zm8 0h6v6H9V1zM1 9h6v6H1V9zm8 0h6v6H9V9z"></path>
                                                    </svg>
                                                    Dashboard
                                                </Link>
                                                <div className="divider"></div>
                                                <Link
                                                    to="#"
                                                    onClick={onLogout}
                                                    className="nav-item">
                                                    Log out
                                                </Link>
                                            </>
                                        ) : (
                                            <Link
                                                to="#"
                                                onClick={() => {
                                                    setIsMenuOpen(false)
                                                    setIsLoginModalOpen(true)
                                                }}
                                                className="nav-item">
                                                Log in
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {showLargeSearch && (
                        <div className="header-bottom">
                            <StaySearch
                                onSearchFocus={onSearchFocus}
                                onSearchCompleted={onSearchCompleted}
                            />
                        </div>
                    )}

                    {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
                </div>
            </header>
        </>
    )
}
