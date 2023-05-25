import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

const NOTE_KEY = 'noteDB'
_createnotes()

export const NoteService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    addNote,
    pinNote,
    getNoteContent,
    setNoteColor
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                notes = notes.filter(note => note.content.includes(filterBy.txt))
            }
            if (filterBy.type) {
                notes = notes.filter(note => note.type === filterBy.type)
            }
            if (filterBy.pin) {
                notes = notes.filter(note => note.isPinned === filterBy.pin)
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)

}


function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getDefaultFilter() {
    return { txt: '', type: '', pin: false }
}

function _createnotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: "n101",
                type: "note-txt",
                isPinned: true,
                info: {
                    title: "Hey There",
                    txt: "Fullstack Me Baby!"
                },
                isPinned: false,
                isEdit: false,
                content: "Hey there Fullstack Me Baby!",
                color: "#e8eaed"
            },
            {
                id: "n102",
                type: "note-img",
                info: {
                    url: "assets/img/puppy.jpg",
                    title: "Bobi and I"
                },
                style: {
                    backgroundColor: "#00d"
                },
                isPinned: false,
                isEdit: false,
                content: "assets/img/puppy.jpg",
                color: "#e8eaed"
            },
            {
                id: "n103",
                type: "note-todos",
                info: {
                    title: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null },
                        { txt: "Coding power", doneAt: 187111111 }
                    ]
                },
                isPinned: false,
                isEdit: false,
                content: "Get my stuff together,Driving liscence,Coding power",
                color: "#e8eaed"
            }
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function addNote(content, noteType, isPinned) {
    console.log(content);
    if (noteType === 'note-txt') return _addTxtNote(content, isPinned)
    else if (noteType === 'note-img') return _addImgNote(content, isPinned)
    else if (noteType === 'note-video') return _addVideoNote(content, isPinned)
    if (noteType === 'note-todos') return _addTodosNote(content, isPinned)
}

function _addTxtNote({ title, txt }, isPinned) {
    const newNote = {
        id: '',
        type: "note-txt",
        info: {
            title,
            txt,
        },
        isPinned,
        isEdit: false,
        color: "#e8eaed",
        content: title + txt
    }
    return save(newNote)
}

function _addTodosNote({ title, txt }, isPinned) {
    const todosText = txt.split(',')
    const todos = todosText.map(todo => ({ txt: todo, doneAt: null }))
    const newNote = {
        id: "",
        type: "note-todos",
        info: {
            title,
            todos,
        },
        isPinned,
        isEdit: false,
        color: "#e8eaed",
        content: title + txt


    }
    return save(newNote)

}
function _addImgNote({ title, txt }, isPinned) {
    const newNote = {
        id: '',
        type: "note-img",
        info: {
            url: txt,
            title,
        },
        style: {
            backgroundColor: "#00d"
        },
        isPinned,
        isEdit: false,
        color: "#e8eaed",
        content: title + txt


    }
    return save(newNote)
}

function _addVideoNote({ title, txt }, isPinned) {
    const urlSplit = txt.split('/')
    const videoId = urlSplit[urlSplit - 1]
    console.log(videoId);
    const newNote = {
        id: '',
        type: "note-video",
        title,
        videoId,
        isPinned,
        isEdit: false,
        color: "#e8eaed",
        url: urlSplit.join(''),
        content: title + txt


    }
    return save(newNote)

}
function pinNote(note) {
    note.isPinned = !note.isPinned
    return save(note)
}
function setNoteColor(note, color) {
    note.color = color
    return save(note)
}


function getNoteContent(note) {
    console.log(note.info);
    if (note.type === 'note-txt') {
        return {
            title: note.info.title,
            txt: note.info.txt
        }
    }
    else if (note.type === 'note-img') {
        return {
            title: note.info.title,
            txt: note.info.url
        }
    }
    else if (note.type === 'note-video') {
        return {
            title: note.title,
            txt: note.url
        }
    }
    if (note.type === 'note-todos') {
        const todos = note.info.todos.map(todo => todo.txt)
        return {
            title: note.info.title,
            txt: todos.join(',')
        }
    }
}
