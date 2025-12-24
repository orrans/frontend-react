import { httpService } from '../http.service'

export const stayService = {
    query,
    getById,
    save,
    remove,
    addStayMsg,
    getFilterFromParams
}

async function query(filterBy = {}) {
    return httpService.get(`stay`, filterBy)
}

function getById(stayId) {
    return httpService.get(`stay/${stayId}`)
}

async function remove(stayId) {
    return httpService.delete(`stay/${stayId}`)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await httpService.put(`stay/${stay._id}`, stay)
    } else {
        savedStay = await httpService.post('stay', stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    // Backend expects an object {txt: "..."}
    const savedMsg = await httpService.post(`stay/${stayId}/msg`, { txt })
    return savedMsg
}

function getFilterFromParams(searchParams = new URLSearchParams()) {
    return {
        txt: searchParams.get('txt') || '',
        minPrice: +searchParams.get('minPrice') || 0,
        maxPrice: +searchParams.get('maxPrice') || 0,
        guests: +searchParams.get('guests') || 0,
        pets: searchParams.get('pets') === 'true',
        loc: searchParams.get('loc') || ''
    }
}