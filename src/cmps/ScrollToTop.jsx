import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
    const location = useLocation()

    useEffect(() => {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
            window.scrollTo(0, 0)
        })
    }, [location.pathname, location.search])

    return null
}

export default ScrollToTop
