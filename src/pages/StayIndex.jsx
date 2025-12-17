import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, addStay } from '../store/actions/stay.actions'
import { stayService } from '../services/stay'
import { StayPreview } from '../cmps/StayPreview'




export function StayIndex() {
    const stays = useSelector((storeState) => storeState.stayModule.stays)


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
            </header>
            <ul className="stay-list clean-list">
                {stays.map((stay) => (
                    <li key={stay._id}>
                        <StayPreview stay={stay} />
                    </li>
                ))}
            </ul>
        </main>
    )
}
