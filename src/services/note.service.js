import { httpService } from './http.service.js'
import { userService } from './user.service.js'

const NOTE_URL = 'note/'

export const noteService = {
    query,
    // get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
}

async function query(filterBy = getDefaultFilter()) {
    console.log('from backend')
    return httpService.get(NOTE_URL, filterBy)

}

function getDefaultFilter() {
    const user = userService.getLoggedinUser()
    return { txt: '', pin: false, userId: user?._id  }
}

// async function get(noteId) {
//     return httpService.get(NOTE_URL + noteId)
// }

async function remove(noteId) {
    console.log('from backend')
    return httpService.delete(NOTE_URL + noteId)
}

async function save(note) {
    console.log('from backend')
    note.content = note.txt + note.title + note.todos.join('')
    if (note._id) {
        return httpService.put(NOTE_URL + note._id, note)
    } else {
        return httpService.post(NOTE_URL, note)
    }
}

function getEmptyNote() {
    const user = userService.getLoggedinUser()
    return {
        title: '',
        txt: '',
        todos: [],
        isPinned: false,
        isEdit: false,
        color: "#ffffff",
        createdBy: user?._id || null
    }
}



