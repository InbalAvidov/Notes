import { storageService } from "./async.storage.service"

const NOTE_KEY = 'noteDB'

export const noteServiceLocal = {
    query,
    // get,
    remove,
    save,
}

async function query(filterBy = _getEmptyFilter()) {
    console.log('from local')
    try {
        let notes = await storageService.query(NOTE_KEY)
        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            notes = notes.filter(note => regex.test(note.content))
        }
        if (filterBy.pin) {
            notes = notes.filter(note => note.isPinned)
        }
        return notes
    } catch (err) {
        throw err
    }
}

function _getEmptyFilter() {
    return { txt: '', pin: false }
}

function remove(noteId) {
    console.log('from local')
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    console.log('from local')
    if (note._id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

