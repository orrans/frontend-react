import { useEffect, useState } from 'react'

export function useIsMobile({ width = 768 } = {}) {
    const [currWidth, setCurrWidth] = useState(window.innerWidth)

    useEffect(() => {
        function handleResize() {
            setCurrWidth(window.innerWidth)
        }
        
        // Set initial width
        handleResize()
        
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return currWidth <= width
}
