import { useState } from 'react'

export function StaySearch() {
    const [loc, setLoc] = useState('')
    const [isLocOpen, setIsLocOpen] = useState(false)


    function handleChange({ target }) {
        setLoc(target.value)
    }

    return (
        <div className="stay-search">
            <div className="search-block" onClick={() => setIsLocOpen(true)}>
                {isLocOpen
                    ?
                    (
                        <input
                            type="text"
                            value={loc}
                            onChange={handleChange}
                            placeholder="Search destinations"
                            className="search-input"
                            autoFocus
                            onBlur={() => !loc && setIsLocOpen(false)}
                        />
                    )
                    :
                    (
                        <button className="search-btn">{loc || 'Where'}</button>
                    )}
            </div>

            <span className="separator"></span>

            <button className="search-btn">When</button>

            <span className="separator"></span>

            <button className="search-btn guests">Who</button>

            <div className="search-icon-container">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: '5.33333', overflow: 'visible' }}><g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g></svg>
            </div>
        </div>
    )
}