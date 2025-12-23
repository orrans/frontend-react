import { useSearchParams } from 'react-router-dom'

export function UseBookingDetails(pricePerNight) {
  const [searchParams] = useSearchParams()

  const checkIn = searchParams.get('checkIn')
  const checkOut = searchParams.get('checkOut')

  const adults = +searchParams.get('adults') || 0
  const children = +searchParams.get('children') || 0
  const totalGuests = adults + children

  function getNights(start, end) {
    if (!start || !end) return 0
    const startDate = new Date(start)
    const endDate = new Date(end)
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
  }

  const nights = getNights(checkIn, checkOut)
  const totalPrice = nights * pricePerNight

  return {
    checkIn,
    checkOut,
    nights,
    totalGuests,
    totalPrice,
  }
}

