export function ReserveBackIcon({size=16, className, stroke='currentcolor'}){
    return <svg 
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 32 32" 
    aria-hidden="true" 
    role="presentation" 
    focusable="false" 
    style={{fill: 'none', height: size, width: size, stroke: stroke, strokeWidth: 4, overflow: 'visible'}}>
        <g fill="none"><path d="M4 16h26M15 28 3.7 16.7a1 1 0 0 1 0-1.4L15 4"></path></g>
    </svg>
}