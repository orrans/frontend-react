import React, { useState, useEffect, useRef } from 'react'

export function Carousel({ imgs = [] }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [containerWidth, setContainerWidth] = useState(0)
    const containerRef = useRef(null)
    const lastWidthRef = useRef(0)
    const widthForScroll = Math.max(0, Math.round(containerWidth))

    useEffect(() => {
        if (!containerRef.current) return

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const newWidth = Math.round(entry.contentRect.width)
                setContainerWidth(newWidth)
            }
        })

        observer.observe(containerRef.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!containerRef.current || widthForScroll <= 0) return

        const el = containerRef.current
        const isResize = lastWidthRef.current !== widthForScroll
        lastWidthRef.current = widthForScroll

        const prevBehavior = el.style.scrollBehavior
        const targetLeft = currentImageIndex * widthForScroll

        if (isResize) {
            el.style.scrollBehavior = 'auto'
            el.scrollTo({ left: targetLeft, top: 0 })
            requestAnimationFrame(() => {
                el.style.scrollBehavior = prevBehavior || 'smooth'
            })
        } else {
            el.style.scrollBehavior = prevBehavior || 'smooth'
            el.scrollTo({ left: targetLeft, top: 0, behavior: 'smooth' })
        }
    }, [widthForScroll, currentImageIndex])

    const handlePreviousClick = (ev) => {
        ev.stopPropagation()
        ev.preventDefault()
        setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev))
    }

    const handleNextClick = (ev) => {
        ev.stopPropagation()
        ev.preventDefault()
        setCurrentImageIndex((prev) => (prev < imgs.length - 1 ? prev + 1 : prev))
    }

    const calculateDotsOffset = () => {
        const maxVisibleDots = 5
        const totalImages = imgs.length
        const dotWidth = 6
        const dotGap = 5 
        const dotSpacing = dotWidth + dotGap

        if (totalImages <= maxVisibleDots) {
            return 0
        }

        if (currentImageIndex < 2) {
            return 0
        } else if (currentImageIndex >= totalImages - 3) {
            return (totalImages - 5) * dotSpacing
        } else {
            return (currentImageIndex - 2) * dotSpacing
        }
    }

    const dotsOffset = calculateDotsOffset()

    const getDotClass = (dotIndex) => {
        const distance = Math.abs(dotIndex - currentImageIndex)
        if (distance === 0) return 'active'
    }

    return (
        <div className="img-carousel" style={{ position: 'relative' }}>
            <div
                ref={containerRef}
                className="imgs-container"
                style={{ display: 'flex', overflow: 'hidden' }}>
                {imgs.map((img, idx) => (
                    <div key={idx}>
                        <img
                            src={img}
                            alt={`Slide ${idx}`}
                            style={{
                                flex: '0 0 100%',
                                width: widthForScroll ? `${widthForScroll}px` : '100%',
                                maxWidth: '100%',
                            }}
                        />
                    </div>
                ))}
            </div>

            {currentImageIndex > 0 && (
                <button className="nav-button left" onClick={handlePreviousClick}>
                    &lt;
                </button>
            )}

            {currentImageIndex < imgs.length - 1 && (
                <button className="nav-button right" onClick={handleNextClick}>
                    &gt;
                </button>
            )}

            <div className="dots">
                <div className="dots-wrapper">
                    <div className="dots-container" style={{ transform: `translateX(-${dotsOffset}px)` }}>
                        {imgs.map((_, index) => (
                            <span key={index} className={`dot ${getDotClass(index)}`}></span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
