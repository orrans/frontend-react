import { storageService } from '../async-storage.service'

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

async function getUsers() {
    const users = await storageService.query('user')
    return users.map((user) => {
        delete user.password
        return user
    })
}

async function getById(userId) {
    return await storageService.get('user', userId)
}

function remove(userId) {
    return storageService.remove('user', userId)
}

async function update({ _id, score, wishlist }) {
    const user = await storageService.get('user', _id)
    user.score = score
    user.wishlist = wishlist
    await storageService.put('user', user)

    // When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser()
    if (loggedinUser._id === user._id) saveLoggedinUser(user)

    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find((user) => user.username === userCred.username)

    if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
    if (!userCred.imgUrl)
        userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    userCred.score = 10000

    const user = await storageService.post('user', userCred)
    return saveLoggedinUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
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
        wishlist: user.wishlist,
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function addToWishlist(stayId) {
    const user = getLoggedinUser()
    if (!user) return Promise.reject('Not logged in')
    if (!user.wishlist) user.wishlist = []
    if (!user.wishlist.includes(stayId)) {
        user.wishlist.push(stayId)
    }
    return update(user)
}

function removeFromWishlist(stayId) {
    const user = getLoggedinUser()
    if (!user) return Promise.reject('Not logged in')
    if (!user.wishlist) user.wishlist = []
    user.wishlist = user.wishlist.filter((id) => id !== stayId)
    return update(user)
}

// create demo users
_createUsers()
async function _createUsers() {
    const users = (await storageService.query('user')) || []

    const usersToSave = [
        {
            _id: 'YIvSm',
            fullname: 'Hodaya Traveler',
            imgUrl: 'https://i.ibb.co/20H9S68G/hodaya.jpg',
            username: 'Hodaya Traveler',
            password: 'secret',
            wishlist: [],
            reviews: [
                {
                    id: 'madeId',
                    txt: 'Quiet guest...',
                    rate: 4,
                    by: {
                        _id: 'u102',
                        fullname: 'Aviad Host',
                        imgUrl: 'https://i.ibb.co/QF359h8M/aviad.jpg',
                    },
                },
            ],
        },
        {
            _id: 'LdZtJ',
            fullname: 'Aviad Host',
            imgUrl: 'https://i.ibb.co/QF359h8M/aviad.jpg',
            username: 'Aviad Host',
            password: 'secret',
            wishlist: [],
        },
    ]

    for (const user of usersToSave) {
        const userExists = users.find((u) => u.username === user.username)
        if (!userExists) {
            await storageService.post('user', user)
        }
    }
}
