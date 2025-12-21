import { useState, useRef, useEffect } from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { DatePicker } from './DatePicker.jsx'
import { GuestCounterRow } from './GuestCounterRow.jsx'
import { ClearIcon } from './icons/ClearIcon.jsx'

const POPULAR_DESTINATIONS = [
    "I'm flexible",
    'New York, United States',
    'London, United Kingdom',
    'Paris, France',
    'Tel Aviv, Israel',
    'Amsterdam, Netherlands',
    'Barcelona, Spain',
]

export function StaySearch() {
    const [loc, setLoc] = useState('')
    const [dateRange, setDateRange] = useState({ start: null, end: null })
    const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0, pets: 0 })
    const [activeField, setActiveField] = useState(null) // 'loc', 'date', 'guests', or null
    const [filteredLocs, setFilteredLocs] = useState(POPULAR_DESTINATIONS)
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const navigate = useNavigate()

    const modalRef = useRef(null)
    const searchBarRef = useRef(null)

    // Calculate total guests for display
    const totalGuests = guests.adults + guests.children
    const guestLabel =
        totalGuests > 0
            ? `${totalGuests} guests${guests.infants ? ', ' + guests.infants + ' infants' : ''}`
            : 'Add guests'

    const hasGuests =
        guests.adults > 0 || guests.children > 0 || guests.infants > 0 || guests.pets > 0

    // Format date label for the single "Date" field
    let dateLabel = 'Add dates'
    if (dateRange.start && dateRange.end) {
        dateLabel = `${formatDate(dateRange.start)} - ${formatDate(dateRange.end)}`
    } else if (dateRange.start) {
        dateLabel = `${formatDate(dateRange.start)} - Add dates`
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (!activeField) return

            if (modalRef.current && modalRef.current.contains(event.target)) {
                return
            }

            if (searchBarRef.current && searchBarRef.current.contains(event.target)) {
                return
            }

            setActiveField(null)
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [activeField])

    function handleGuestChange(type, operation) {
        setGuests((prev) => {
            const newValue = operation === 'inc' ? prev[type] + 1 : prev[type] - 1
            if (newValue < 0) return prev
            return { ...prev, [type]: newValue }
        })
    }

    function handleClearGuests(e) {
        e.stopPropagation()
        setGuests({ adults: 0, children: 0, infants: 0, pets: 0 })
    }

    function handleLocChange(e) {
        const value = e.target.value
        setLoc(value)
        if (!value) {
            setFilteredLocs(POPULAR_DESTINATIONS)
        } else {
            const filtered = POPULAR_DESTINATIONS.filter((dest) =>
                dest.toLowerCase().includes(value.toLowerCase())
            )
            setFilteredLocs(filtered)
        }
    }

    function handleLocSelect(location) {
        setLoc(location === "I'm flexible" ? '' : location)
        setActiveField('date')
    }

    function handleLocKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault()
            // If user types something and hits enter, move to next field
            setActiveField('date')
        }
    }

    function handleMonthChange(diff) {
        setCurrentMonth((prev) => {
            return new Date(prev.getFullYear(), prev.getMonth() + diff, 1)
        })
    }

    function handleSearch(e) {
        e.stopPropagation()

        const params = {
            loc,
            checkIn: dateRange.start ? dateRange.start.toISOString() : '',
            checkOut: dateRange.end ? dateRange.end.toISOString() : '',
            adults: guests.adults,
            children: guests.children,
            infants: guests.infants,
            pets: guests.pets,
        }

        navigate({
            pathname: '/stay',
            search: `?${createSearchParams(params)}`,
        })
    }

    function formatDate(date) {
        if (!date) return ''
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    return (
        <div className="stay-search-container">
            <div className={`search-bar ${activeField ? 'bar-active' : ''}`} ref={searchBarRef}>
                {/* 1. Location Section */}
                <div
                    className={`search-item ${activeField === 'loc' ? 'active' : ''}`}
                    onClick={() => setActiveField('loc')}>
                    <label>Where</label>
                    <input
                        type="text"
                        placeholder="Search destinations"
                        value={loc}
                        onChange={handleLocChange}
                        onKeyDown={handleLocKeyDown}
                        className="search-input-clean"
                    />
                </div>

                <span className="divider"></span>

                {/* 2. Date Section (Merged) */}
                <div
                    className={`search-item ${activeField === 'date' ? 'active' : ''}`}
                    onClick={() => setActiveField('date')}>
                    <label>When</label>
                    <div className={`placeholder ${dateRange.start ? 'bold' : ''}`}>
                        {dateLabel}
                    </div>
                </div>

                <span className="divider"></span>

                {/* 3. Who Section */}
                <div
                    className={`search-item who ${activeField === 'guests' ? 'active' : ''}`}
                    onClick={() => setActiveField('guests')}>
                    <div className="who-content">
                        <label>Who</label>
                        <div className={`placeholder ${totalGuests > 0 ? 'bold' : ''}`}>
                            {guestLabel}
                        </div>
                    </div>

                    {activeField === 'guests' && hasGuests && (
                        <div className="clear-btn-x" onClick={handleClearGuests}>
                            <ClearIcon />
                        </div>
                    )}

                    <button className="search-btn-primary" onClick={handleSearch}>
                        <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{
                                display: 'block',
                                fill: 'none',
                                height: '16px',
                                width: '16px',
                                stroke: 'currentcolor',
                                strokeWidth: '4',
                                overflow: 'visible',
                            }}>
                            <g fill="none">
                                <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
                            </g>
                        </svg>
                        {activeField && <span>Search</span>}
                    </button>
                </div>
            </div>

            {/* Floating Modals Area */}
            {activeField && (
                <div
                    className={`search-modal-dropdown ${activeField}`}
                    ref={modalRef}
                    onClick={(e) => e.stopPropagation()}>
                    {activeField === 'loc' && (
                        <div className="modal-content location-suggestions">
                            <div className="suggestion-title">Suggested destinations</div>
                            {filteredLocs.map((dest, idx) => (
                                <div
                                    key={idx}
                                    className="suggestion-item"
                                    onClick={() => handleLocSelect(dest)}>
                                    <div className="icon-box">
                                        <img src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-hawaii-autosuggest-destination-icons-2/original/d2d9f652-03f0-4c23-9246-f825ffd1f0d4.png" alt="Location" />
                                    </div>
                                    <span className="suggestion-text">{dest}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeField === 'date' && (
                        <div
                            className="modal-content date-picker-wrapper"
                            style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                            <DatePicker
                                isOpen={true}
                                dateRange={dateRange}
                                onSetDateRange={setDateRange}
                                currentMonth={currentMonth}
                                onMonthChange={handleMonthChange}
                                hideNext={true}
                            />
                            <DatePicker
                                isOpen={true}
                                dateRange={dateRange}
                                onSetDateRange={setDateRange}
                                currentMonth={
                                    new Date(
                                        currentMonth.getFullYear(),
                                        currentMonth.getMonth() + 1,
                                        1
                                    )
                                }
                                onMonthChange={handleMonthChange}
                                hidePrev={true}
                            />
                        </div>
                    )}

                    {activeField === 'guests' && (
                        <div className="modal-content guest-picker">
                            <GuestCounterRow
                                type="adults"
                                label="Adults"
                                sub="Ages 13 or above"
                                value={guests.adults}
                                onChange={handleGuestChange}
                            />
                            <GuestCounterRow
                                type="children"
                                label="Children"
                                sub="Ages 2-12"
                                value={guests.children}
                                onChange={handleGuestChange}
                            />
                            <GuestCounterRow
                                type="infants"
                                label="Infants"
                                sub="Under 2"
                                value={guests.infants}
                                onChange={handleGuestChange}
                            />
                            <GuestCounterRow
                                type="pets"
                                label="Pets"
                                sub="Bringing a service animal?"
                                value={guests.pets}
                                onChange={handleGuestChange}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
