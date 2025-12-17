import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { stayService } from '../services/stay.service'

export function StayDetails() {
  const { stayId } = useParams()
  const [stay, setStay] = useState(null)

  useEffect(() => {
    loadStay()
  }, [stayId])

  async function loadStay() {
    const stay = await stayService.getById(stayId)
    setStay(stay)
  }

  if (!stay) return <div>Loading...</div>

  return (
    <section className="stay-details">
      <h1>{stay.vendor}</h1>
      <p>{stay.loc.city}, {stay.loc.country}</p>
      <p>${stay.price} / night</p>
    </section>
  )
}

