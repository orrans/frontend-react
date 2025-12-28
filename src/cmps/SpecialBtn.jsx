import { useRef } from 'react'

export function SpecialBtn({ txt, onClick, className = '' }) {
    const buttonRef = useRef(null)

    const handleMouseMove = (e) => {
        const button = buttonRef.current
        if (!button) return

        const rect = button.getBoundingClientRect()
        const x = (e.clientX - rect.left) * 100 / button.clientWidth
        const y = (e.clientY - rect.top) * 100 / button.clientHeight
        
        button.style.setProperty('--mouse-x', x)
        button.style.setProperty('--mouse-y', y)
    }

    return (
        <button
            ref={buttonRef}
            className={`special-btn ${className}`}
            onClick={onClick}
            onMouseMove={handleMouseMove}
        >
            {txt}
        </button>
    )
}
