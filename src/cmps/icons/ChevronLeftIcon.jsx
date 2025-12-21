export function ChevronLeftIcon({ size = 12, strokeWidth = 4 }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{
                display: 'block',
                fill: 'none',
                height: size,
                width: size,
                stroke: 'currentcolor',
                strokeWidth: strokeWidth,
                overflow: 'visible',
            }}>
            <path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path>
        </svg>
    )
}
