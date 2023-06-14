import { httpService } from './http.service.js'
import { userService } from './user-service.js'

const NOTE_URL = 'note/'

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
}

async function query(filterBy = getDefaultFilter()) {
    return httpService.get(NOTE_URL, filterBy)

}

function getDefaultFilter() {
    return { txt: '', pin: false }
}

async function get(noteId) {
    return httpService.get(NOTE_URL + noteId)
}

async function remove(noteId) {
    return httpService.delete(NOTE_URL + noteId)
}

async function save(note) {
    if (note._id) {
        return httpService.put(NOTE_URL + note._id, note)
    } else {
        const noteToSave = _createNoteByType(note)
        console.log('noteToSave:',noteToSave)
        return httpService.post(NOTE_URL, noteToSave)
    }
}

function _createNoteByType(note) {
    let user = userService.getLoggedinUser()
    if (!user) user = {userName : 'Guest'}
    if (note.type === 'txt') return _createTxtNote(note, user)
    else if (note.type === 'img') return _createImgNote(note, user)
    else if (note.type === 'video') return _createVideoNote(note, user)
    if (note.type === 'todos') return _createTodosNote(note, user)
}

function _createTxtNote({ title, txt }, user) {
    const newNote = {
        type: "txt",
        title,
        txt,
        isPinned: false,
        isEdit: false,
        color: "#ffffff",
        createdBy: user.userName
    }
    return newNote
}

function _createTodosNote({ title, todos }, user) {
    const newNote = {
        type: "todos",
        title,
        todos,
        isPinned: false,
        isEdit: false,
        color: "#ffffff",
        createdBy: user.userName,
        content : todos.join(',')

    }
    return newNote

}

function _createImgNote({ title, url }, user) {
    const newNote = {
        type: "img",
        url,
        title,
        isPinned: false,
        isEdit: false,
        color: "#ffffff",
        createdBy: user.userName
    }
    return newNote
}

function _createVideoNote({ title, url }, user) {
    const urlSplit = url.split('/')
    const videoId = urlSplit[urlSplit - 1]
    const newNote = {
        type: "video",
        title,
        videoId,
        isPinned: false,
        isEdit: false,
        color: "#ffffff",
        url: urlSplit.join(''),
        createdBy: user.userName
    }
    return newNote
}


function getEmptyNote() {
    const user = userService.getLoggedinUser()
    return {
        type: '',
        title: '',
        isPinned: false,
        isEdit: false,
        color: "#ffffff",
        createdBy: user?.userName || 'guest'
    }
}



// import { storageService } from "./async-storage.service.js"
// import { utilService } from "./util-service.js"

// const NOTE_KEY = 'noteDB'
// _createnotes()

// export const noteService = {
//     query,
//     get,
//     remove,
//     save,
//     getDefaultFilter,
//     addNote,
//     pinNote,
//     getNoteContent,
//     setNoteColor,
//     getEmptyNote
// }

// async function query(filterBy = getDefaultFilter()) {
//     let notes = await storageService.query(NOTE_KEY)
//     if (filterBy.txt) {
//         const regex = new RegExp(filterBy.title || filterBy.txt, 'i')
//         notes = notes.filter(note => regex.test(note.title || note.txt))
//     }
//     if (filterBy.pin) {
//         notes = notes.filter(note => note.isPinned === filterBy.pin)
//     }
//     const sortedNotes = notes.reduce((acc , note) => {
//         if(note.isPinned) acc.unshift(note)
//         else acc.push(note)
//         return acc
//     },[])
//     return sortedNotes

// }

// function get(note_id) {
//     return storageService.get(NOTE_KEY, note_id)

// }


// function remove(note_id) {
//     return storageService.remove(NOTE_KEY, note_id)
// }

// function save(note) {
//     if (note._id) {
//         return storageService.put(NOTE_KEY, note)
//     } else {
//         // const noteToSave = addNote(note)
//         console.log('note:',note)
//         return storageService.post(NOTE_KEY, note)
//     }
// }

// function getDefaultFilter() {
//     return { txt: '', pin: false }
// }

// function getEmptyNote(type) {
//     const newNote = {
//         _id: '',
//         type,
//         title: '',
//         isPinned: false,
//         isEdit: false,
//         color: "#ffffff",
//     }
//     return newNote
// }

// function _createnotes() {
//     let notes = utilService.loadFromStorage(NOTE_KEY)
//     if (!notes || !notes.length) {
//         notes = [
//             {
//                 _id: "n101",
//                 type: "txt",
//                 title: "Hey There",
//                 txt: "Fullstack Me Baby!",
//                 isPinned: false,
//                 isEdit: false,
//                 color: "#ffffff"
//             },
//             {
//                 _id: "n102",
//                 type: "img",
//                 url: 'https://res.cloudinary.com/damrhms1q/image/upload/v1675069323/bg-test5_yng29f.jpg',
//                 title: "go check out Playlist app - https://playlist-kqq9.onrender.com",
//                 isPinned: true,
//                 isEdit: false,
//                 color: "#ffffff"
//             },
//             {
//                 _id: "n103",
//                 type: "todos",
//                 title: "Get my stuff together",
//                 todos: ["Driving liscence", "Coding power"],
//                 isPinned: false,
//                 isEdit: false,
//                 content: "Get my stuff together,Driving liscence,Coding power",
//                 color: "#ffffff"
//             }
//         ]
//         utilService.saveToStorage(NOTE_KEY, notes)
//     }
// }

// function addNote(note) {
//     console.log(note)
//     if (note.type === 'txt') return _addTxtNote(note)
//     else if (note.type === 'img') return _addImgNote(note)
//     else if (note.type === 'video') return _addVideoNote(note)
//     if (note.type === 'todos') return _addTodosNote(note)
// }

// function _addTxtNote({ title, txt }) {
//     const newNote = {
//         _id: '',
//         type: "txt",
//         title,
//         txt,
//         isPinned: false,
//         isEdit: false,
//         color: "#ffffff",
//     }
//     return save(newNote)
// }

// function _addTodosNote({ title, todos }) {
//     const newNote = {
//         _id: "",
//         type: "todos",
//         title,
//         todos,
//         isPinned: false,
//         isEdit: false,
//         color: "#ffffff",
//     }
//     return save(newNote)

// }
// function _addImgNote({ title, url }) {
//     const newNote = {
//         _id: '',
//         type: "img",
//         url,
//         title,
//         isPinned: false,
//         isEdit: false,
//         color: "#ffffff",
//     }
//     return save(newNote)
// }

// function _addVideoNote({ title, url }) {
//     console.log('url:',url)
//     const urlSplit = url.split('/')
//     const videoId = urlSplit[urlSplit - 1]
//     console.log(videoId);
//     const newNote = {
//         _id: '',
//         type: "video",
//         title,
//         videoId,
//         isPinned: false,
//         isEdit: false,
//         color: "#ffffff",
//         url: urlSplit.join(''),
//     }
//     return save(newNote)

// }
// function pinNote(note) {
//     note.isPinned = !note.isPinned
//     return save(note)
// }
// function setNoteColor(note, color) {
//     note.color = color
//     return save(note)
// }


// function getNoteContent(note) {
//     console.log(note.info);
//     if (note.type === 'note-txt') {
//         return {
//             title: note.info.title,
//             txt: note.info.txt
//         }
//     }
//     else if (note.type === 'note-img') {
//         return {
//             title: note.info.title,
//             txt: note.info.url
//         }
//     }
//     else if (note.type === 'note-v_ideo') {
//         return {
//             title: note.title,
//             txt: note.url
//         }
//     }
//     if (note.type === 'note-todos') {
//         const todos = note.info.todos.map(todo => todo.txt)
//         return {
//             title: note.info.title,
//             txt: todos.join(',')
//         }
//     }
// }
