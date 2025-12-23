import { useLocation, useSearchParams } from 'react-router-dom'

export function UseBookingDetails(price = 0) {
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const stateBooking = location.state?.booking

  const checkIn =
    stateBooking?.checkIn ??
    searchParams.get('checkIn')

  const checkOut =
    stateBooking?.checkOut ??
    searchParams.get('checkOut')

  const adults =
    stateBooking?.adults !== undefined
      ? stateBooking.adults
      : Number(searchParams.get('adults')) || 0

  const children =
    stateBooking?.children !== undefined
      ? stateBooking.children
      : Number(searchParams.get('children')) || 0

  const infants =
    stateBooking?.infants !== undefined
      ? stateBooking.infants
      : Number(searchParams.get('infants')) || 0

  const pets =
    stateBooking?.pets !== undefined
      ? stateBooking.pets
      : Number(searchParams.get('pets')) || 0

  const totalGuests = adults + children

  let nights = 0
  if (checkIn && checkOut) {
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diff = end - start
    if (diff > 0) {
      nights = Math.ceil(diff / (1000 * 60 * 60 * 24))
    }
  }

  const totalPrice = nights > 0 ? nights * price : 0

  return {
    checkIn,
    checkOut,
    nights,
    totalPrice,
    guests: {
      adults,
      children,
      infants,
      pets,
      totalGuests,
    },
    hasDates: nights > 0,
  }
}
