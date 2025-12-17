import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, addStay } from '../store/actions/stay.actions'
import { stayService } from '../services/stay'
import { userService } from '../services/user'

export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)

    useEffect(() => {
        loadStays()
    }, [])

    async function onAddStay() {
        const stay = stayService.getEmptyStay()
        stay.name = prompt('Stay name?')
        stay.price = +prompt('Price?')
        try {
            const savedStay = await addStay(stay)
            console.log('Stay added', savedStay)
        } catch (err) {
            console.log('Cannot add stay', err)
        }
    }

    if (!stays) return <div>Loading...</div>

    return (
        <main className="stay-index">
            <header>
                <h2>Stays List</h2>
                {userService.getLoggedinUser() && <button onClick={onAddStay}>Add a Stay</button>}
            </header>

            <ul className="stay-list clean-list">
                {stays.map(stay => (
                    <li key={stay._id} className="stay-preview">
                        {stay.imgUrls && stay.imgUrls.length > 0 &&
                            <img src={stay.imgUrls[0]} alt={stay.name} style={{ maxWidth: '200px' }} />
                        }
                        <h4>{stay.name}</h4>
                        <p>{stay.loc?.city}, {stay.loc?.country}</p>
                        <p><strong>${stay.price}</strong> / night</p>
                    </li>
                ))}
            </ul>
        </main>
    )
}