import { httpService } from './http.service'

const AUTH_URL = 'auth/'
const USER_URL = 'user/'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getById,
    getUsers,
    update,
    getEmptyCredentials
}

window.userService = userService

async function getById(userId) {
    return httpService.get(USER_URL + userId)
}

async function getUsers() {
    return httpService.get(USER_URL)
}

async function login(userCred) {
    const user = await httpService.post(AUTH_URL + 'login', userCred)
    return saveLocalUser(user)
}

async function signup(userCred) {
    const user = await httpService.post(AUTH_URL + 'signup', userCred)
    return saveLocalUser(user)
}

async function logout() {
    await httpService.post(AUTH_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    localStorage.clear()
    
}

async function update(user) {
    const newUser = await httpService.put(USER_URL + '/' + user._id, user)
    if (getLoggedinUser()._id === user._id) saveLocalUser(newUser)
    return newUser
}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyCredentials() {
    return {
        fullName: '',
        email: '',
        userName: '',
        password: '',
    }
}




// import { storageService } from './async-storage.service'
// import { utilService } from './util.service'

// const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
// const USERS_KEY = 'users'
// _createUsers()


// export const userService = {
//     login,
//     logout,
//     signup,
//     getLoggedinUser,
//     saveLocalUser,
//     getUsers,
//     getById,
//     remove,
//     update,
//     getEmptyCredentials
// }

// window.userService = userService


// function getUsers() {
//     return storageService.query(USERS_KEY)
// }

// async function getById(userId) {
//     const user = await storageService.get(USERS_KEY, userId)
//     return user
// }

// function remove(userId) {
//     return storageService.remove(USERS_KEY, userId)
// }

// async function update(user) {
//     const newUser = await storageService.put(USERS_KEY, user)
//     if (getLoggedinUser()._id === user._id) saveLocalUser(newUser)
//     return newUser
// }

// async function login(userCred) {
//     const users = await storageService.query(USERS_KEY)
//     const user = users.find(user => user.userName === userCred.userName)
//     if (user) {
//         return saveLocalUser(user)
//     }
// }
// async function signup(userCred) {
//     userCred.likedSongs = []
//     userCred.likedStations = []
//     const user = await storageService.post(USERS_KEY, userCred)
//     return saveLocalUser(user)
// }

// async function logout() {
//     sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
// }


// function saveLocalUser(user) {
//     user = { _id: user._id, fullName: user.fullName, userName: user.userName, imgUrl: user.imgUrl, likedSongs: user.likedSongs, likedStations: user.likedStations }
//     sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
//     return user
// }

// function getLoggedinUser() {
//     return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
// }

// function getEmptyCredentials() {
//     return {
//         fullName: '',
//         email: '',
//         userName: '',
//         password: '',
//     }
// }

// function _createUsers() {
//     let users = utilService.loadFromStorage(USERS_KEY)
//     if (!users || !users.length) {
//         users = [
//             {
//                 _id: '5cksxjas89xjsa8xjsa8jld3',
//                 fullName: 'Inbal Avidov',
//                 email: 'inbal.avidov@gmail.com',
//                 userName: 'inbal.avidov',
//                 password: 'inbal054'
//             }
//         ]
//         utilService.saveToStorage(USERS_KEY, users)
//     }
// }


