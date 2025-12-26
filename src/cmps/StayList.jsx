import { StayPreview } from './StayPreview.jsx'

export function StayList({
    stays,
    fromDate,
    toDate,
    location,
    showPrice = true,
    onStayHover = () => {},
    wishlist = false,
}) {
    // const fromDate = new Date()
    // const toDate = new Date()
    // toDate.setDate(toDate.getDate() + 2)

    const city = location?.split(',')[0] || stays[0]?.loc.city

    return (
        <section className="stay-list-container">
            <span className="stay-list-title">
                {wishlist ? 'Wishlist' : `Over 1,000 homes in ${city}`}
            </span>
            <ul className="stay-list">
                {stays.map((stay) => (
                    <li
                        key={stay._id}
                        onMouseEnter={() => onStayHover(stay._id)}
                        onMouseLeave={() => onStayHover(null)}>
                        <StayPreview
                            stay={stay}
                            fromDate={fromDate}
                            toDate={toDate}
                            variant="filtered"
                            showPrice={showPrice}
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}
