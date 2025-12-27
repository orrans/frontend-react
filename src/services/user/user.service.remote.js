import { httpService } from '../http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    saveLoggedinUser,
    addToWishlist,
    removeFromWishlist,
}

function getUsers() {
    return httpService.get(`user`)
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    const savedUser = await httpService.put(`user/${user._id}`, user)

    // Handle local session update if the updated user is the current logged-in user
    const loggedinUser = getLoggedinUser()
    if (loggedinUser && loggedinUser._id === savedUser._id) {
        saveLoggedinUser(savedUser)
    }
    return savedUser
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
    // Defaults (like imgUrl, score) will be handled by the Backend
    const user = await httpService.post('auth/signup', userCred)
    return saveLoggedinUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout')
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
    user = {
        _id: user._id,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
        score: user.score,
        isAdmin: user.isAdmin,
        wishlist: user.wishlist || [],
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

async function addToWishlist(stayId) {
    const user = getLoggedinUser()
    if (!user) return Promise.reject('Not logged in')
    if (!user.wishlist) user.wishlist = []
    if (!user.wishlist.includes(stayId)) {
        user.wishlist.push(stayId)
    }
    saveLoggedinUser(user)

    return await httpService.post('user/wishlist', { stayId })
}

async function removeFromWishlist(stayId) {
    const user = getLoggedinUser()
    if (!user) return Promise.reject('Not logged in')
    if (!user.wishlist) user.wishlist = []
    user.wishlist = user.wishlist.filter((id) => id !== stayId)
    saveLoggedinUser(user)

    return await httpService.delete('user/wishlist', { stayId })
}
