
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
                >-</button>
                <span className="guest-value">{value}</span>
                <button
                    onClick={(e) => { e.stopPropagation(); onChange(type, 'inc') }}
                    className="counter-btn"
                >+</button>
            </div>
        </div>
    )
}