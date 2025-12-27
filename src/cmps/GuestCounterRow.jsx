
export function GuestCounterRow({ type, label, sub, value, onChange }) {
    return (
        <div className="guest-row">
            <div className="guest-info">
                <span className="guest-label">{label}</span>
                <span className="guest-sub">{sub}</span>
            </div>
            <div className="guest-actions">
                <button
                    disabled={value <= 0}
                    onClick={(e) => { e.stopPropagation(); onChange(type, 'dec') }}
                    className="counter-btn"
                >
                    <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m.75 6.75h10.5v-1.5h-10.5z"></path></svg>
                </button>
                <span className="guest-value">{value}</span>
                <button
                    onClick={(e) => { e.stopPropagation(); onChange(type, 'inc') }}
                    className="counter-btn"
                >
                    <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z"></path></svg>
                </button>
            </div>
        </div>
    )
}