import { noteServiceLocal } from "../services/note.local.service.js"
import { noteService } from "../services/note.service.js"
import { userService } from "../services/user.service.js"
import { utilService } from "../services/util.service.js"
import { SET_NOTES, ADD_NOTE, UPDATE_NOTE, REMOVE_NOTE, UPDATE_COLOR, PIN_NOTE, SET_USER } from "./reducer.js"
import { store } from "./store"

let userName = ''

function getUserName() {
    const user = userService.getLoggedinUser()
    console.log('user:',user)
    if (user) userName = user.userName
}

export async function loadNotes(filterBy) {
    getUserName()
    try {
        let notes
        if (userName === 'guest') notes = await noteServiceLocal.query(filterBy)
        else notes = await noteService.query(filterBy)
        store.dispatch({ type: SET_NOTES, notes })
    } catch (err) {
        console.log('Had issues loading notes', err)
        throw err
    }
}

export async function saveNote(note) {
    try {
        if (userName === 'guest') await noteServiceLocal.save(note)
        else await noteService.save(note)
        store.dispatch({ type: ADD_NOTE, note })
    } catch (err) {
        console.log('Had issues to get current note', err)
        throw err
    }
}

export async function updateNote(note) {
    try {
        if (userName === 'guest') await noteServiceLocal.save(note)
        else await noteService.save(note)
        store.dispatch({ type: UPDATE_NOTE, note })
    } catch (err) {
        console.log('Had issues to get current note', err)
        throw err
    }
}

export async function updateColor(note, color) {
    try {
        const updatedNote = ({ ...note, color })
        if (userName === 'guest') await noteServiceLocal.save(updatedNote)
        else await noteService.save(updatedNote)
        store.dispatch({ type: UPDATE_COLOR, note: updatedNote })
        return updatedNote
    } catch (err) {
        console.log('Had issues to get current note', err)
        throw err
    }
}

export async function pinNote(note, isPinned) {
    try {
        const updatedNote = ({ ...note, isPinned })
        if (userName === 'guest') await noteServiceLocal.save(updatedNote)
        else await noteService.save(updatedNote)
        store.dispatch({ type: PIN_NOTE, note: updatedNote })
        return updatedNote
    } catch (err) {
        console.log('Had issues to get current note', err)
        throw err
    }
}

export async function removeNote(noteId) {
    try {
        if (userName === 'guest') await noteServiceLocal.remove(noteId)
        else await noteService.remove(noteId)
        store.dispatch({ type: REMOVE_NOTE, noteId })
    } catch (err) {
        console.log('Had issues to get current note', err)
        throw err
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.error('Cannot login:', err)
        throw err
    }
}

export async function loginAsGuest() {
    try {
        const user = { userName: 'guest', _id: utilService.makeId() }
        userService.saveLocalUser(user)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.error('Cannot login:', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.error('Cannot signup:', err)
        throw err
    }
}


export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
    } catch (err) {
        console.error('Cannot logout:', err)
        throw err
    }
}



