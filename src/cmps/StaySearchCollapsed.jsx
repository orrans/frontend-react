import { useSelector } from 'react-redux'
import { formatDate } from '../services/util.service'

export function StaySearchCollapsed({ onToggleSearch }) {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)

    const locationText = filterBy.loc || 'Anywhere'

    let dateText = 'Any week'
    if (filterBy.checkIn && filterBy.checkOut) {
        const start = new Date(filterBy.checkIn)
        const end = new Date(filterBy.checkOut)
        dateText = `${formatDate(start)} - ${formatDate(end)}`
    }

    const totalGuests = (filterBy.guests) ||
        ((filterBy.adults || 0) + (filterBy.children || 0) + (filterBy.infants || 0)) || 0

    const guestText = totalGuests > 0 ? `${totalGuests} guests` : 'Add guests'

    return (
        <div className="stay-search-collapsed" onClick={onToggleSearch}>
            <button className="collapsed-search-btn">
                <span className="search-text-segment strong">{locationText}</span>
                <span className="divider"></span>
                <span className="search-text-segment strong">{dateText}</span>
                <span className="divider"></span>
                <div className="guest-segment">
                    <span className={`search-text-segment ${totalGuests ? 'strong' : 'placeholder'}`}>
                        {guestText}
                    </span>
                    <div className="search-icon-wrapper">
                        <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: '5.33333', overflow: 'visible' }}
                        >
                            <g fill="none">
                                <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
                            </g>
                        </svg>
                    </div>
                </div>
            </button>
        </div>
    )
}