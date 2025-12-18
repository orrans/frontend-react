import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, addStay } from '../store/actions/stay.actions'
import { stayService } from '../services/stay'
import { StayExploreList } from '../cmps/StayExploreList.jsx'
import { StayList } from '../cmps/StayList.jsx'




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
            {/* <StayExploreList stays={stays} title='Nearby Hotel'/> */}
            {/* <StayList stays={stays}/> */}
        </main>
    )
}
