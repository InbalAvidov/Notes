import { userService } from "../services/user.service"

export const SET_NOTES = 'SET_NOTES'
export const REMOVE_NOTE = 'REMOVE_NOTE'
export const ADD_NOTE = 'ADD_NOTE'
export const UPDATE_NOTE = 'UPDATE_NOTE'
export const UPDATE_CURRENT_NOTE = 'UPDATE_CURRENT_NOTE'
export const UPDATE_COLOR = 'UPDATE_COLOR'
export const PIN_NOTE = 'PIN_NOTE'
export const SET_USER = 'SET_USER'
export const SET_USERS = 'SET_USERS'

const initialState = {
    notes: [],
    user: userService.getLoggedinUser(),
    users: userService.getUsers()
}

export function NotesReducer(state = initialState, action) {
    let notes
    switch (action.type) {
        case SET_NOTES:
            return { ...state, notes: [...action.notes] }
        case REMOVE_NOTE:
            notes = state.notes.filter(n => n._id !== action.noteId)
            return { ...state, notes }
        case ADD_NOTE:
            notes = [...state.notes, action.note]
            return { ...state, notes }
        case UPDATE_NOTE:
            notes = state.notes.map(note => note._id === action.note._id ? action.note : note)
            return { ...state, notes }
        case UPDATE_CURRENT_NOTE:
            return { ...state, currNote: action.currNote }
        case UPDATE_COLOR:
            return { ...state, currNote: action.currNote }
        case PIN_NOTE:
            return { ...state, currNote: action.currNote }
        case SET_USER:
            return { ...state, user: action.user }
        case SET_USERS:
            return { ...state, users: action.users }
        default:
            return state
    }
} 
