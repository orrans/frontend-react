export function ChevronRightIcon({ size = 12, strokeWidth = 4 }) {
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
            <path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path>
        </svg>
    )
}
