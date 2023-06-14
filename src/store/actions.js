import { noteService } from "../services/note-service.js"
import { userService } from "../services/user-service.js"
import { SET_NOTES, UPDATE_CURRENT_NOTE, ADD_NOTE, UPDATE_NOTE, REMOVE_NOTE, UPDATE_COLOR, PIN_NOTE, SET_USER } from "./reducer.js"
import { store } from "./store"

export async function loadNotes(filterBy) {
    try {
        const notes = await noteService.query(filterBy)
        console.log('notes:',notes)
        store.dispatch({ type: SET_NOTES, notes })
    } catch (err) {
        console.log('Had issues loading notes', err)
        throw err
    }
}

export async function loadCurrNote(noteId) {
    try {
        const note = await noteService.get(noteId)
        store.dispatch({ type: UPDATE_CURRENT_NOTE, note })
    } catch (err) {
        console.log('Had issues loading current note', err)
        throw err
    }
}

export async function saveNote(note) {
    try {
        console.log(note)
        const newNote = await noteService.save(note)
        console.log(newNote)
        store.dispatch({ type: ADD_NOTE, note: newNote })
        return newNote
    } catch (err) {
        console.log('Had issues to get current note', err)
        throw err
    }
}

export async function updateNote(note) {
    try {
        const updatedNote = await noteService.save(note)
        store.dispatch({ type: UPDATE_NOTE, note: updatedNote })
        return updatedNote
    } catch (err) {
        console.log('Had issues to get current note', err)
        throw err
    }
}

export async function updateColor(note, color) {
    try {
        const updatedNote = await noteService.save({ ...note, color })
        store.dispatch({ type: UPDATE_COLOR, note: updatedNote })
        return updatedNote
    } catch (err) {
        console.log('Had issues to get current note', err)
        throw err
    }
}

export async function pinNote(note, isPinned) {
    try {
        const updatedNote = await noteService.save({ ...note, isPinned })
        store.dispatch({ type: PIN_NOTE, note: updatedNote })
        return updatedNote
    } catch (err) {
        console.log('Had issues to get current note', err)
        throw err
    }
}

export async function removeNote(noteId) {
    try {
        await noteService.remove(noteId)
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

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        console.log('user:', user)
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



