export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

export function makeLorem(size = 100) {
    var words = [
        'The sky',
        'above',
        'the port',
        'was',
        'the color of television',
        'tuned',
        'to',
        'a dead channel',
        '.',
        'All',
        'this happened',
        'more or less',
        '.',
        'I',
        'had',
        'the story',
        'bit by bit',
        'from various people',
        'and',
        'as generally',
        'happens',
        'in such cases',
        'each time',
        'it',
        'was',
        'a different story',
        '.',
        'It',
        'was',
        'a pleasure',
        'to',
        'burn',
    ]
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

export function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

export function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
}

function getValueByPath(obj, path) {
    return path.split('.').reduce((acc, key) => {
        return acc ? acc[key] : undefined
    }, obj)
}

export function groupBy(arr, keyPath) {
    const grouped = {}

    arr.forEach((item) => {
        const groupKey = getValueByPath(item, keyPath)

        if (groupKey === undefined) return

        if (!grouped[groupKey]) {
            grouped[groupKey] = []
        }

        grouped[groupKey].push(item)
    })

    return grouped
}

export function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(price)
}

export function formatGuests({ adults = 0, kids = 0, infants = 0, pets = 0 }) {
  const total = adults + kids
  const parts = []

  if (total) parts.push(`${total} guest${total > 1 ? 's' : ''}`)
  if (infants) parts.push(`${infants} infant${infants > 1 ? 's' : ''}`)
  if (pets) parts.push(`${pets} pet${pets > 1 ? 's' : ''}`)

  return parts.join(', ')
}

export function formatDate(date) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}