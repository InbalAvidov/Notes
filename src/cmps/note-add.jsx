import { useState } from "react"
import { faImage, faPlayCircle, faCircleCheck, faClipboard } from '@fortawesome/free-regular-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { noteService } from "../services/note-service"
import { uploadService } from "../services/upload.service"
import { saveNote, updateNote } from "../store/actions"

export function NoteAdd({ openCloseModal, editNote }) {
    const [noteType, setNoteType] = useState('txt')
    const [note, setNote] = useState(editNote || noteService.getEmptyNote(noteType))

    function handleChange({ target }, idx) {
        const { value, name: field } = target
        if (noteType === 'todos' && idx !== undefined) {
            note.todos[idx] = value
            setNote((prevContent) => ({ ...prevContent, 'todos': note.todos }))
        }
        else setNote((prevContent) => ({ ...prevContent, [field]: value }))
    }

    async function onUploadImg(ev) {
        try {
            await onSelectImg(ev)
        } catch (err) {
            console.log('err:', err)
        }
    }

    async function onSelectImg(ev) {
        try {
            const imgUrl = await uploadService.uploadImg(ev)
            setNote((prevContent) => ({ ...prevContent, url: imgUrl }))
            return imgUrl
        } catch (err) {
            console.log('Cant set image', err)
        }
    }

    async function onSaveNote() {
        try {
            if (note._id) await updateNote(note)
            else await saveNote(note, noteType)
        } catch (err) {
            console.log(err)
        }
        openCloseModal()
    }

    function changeNoteType(type) {
        setNote((prevNote)=>({...prevNote , 'type' : type}))
        if (type === 'todos') {
            setNote((prev) => ({ ...prev, 'todos': ['new task'] }))
        }
    }

    function addTodo() {
        setNote((prev => ({ ...prev, 'todos': [...note.todos, 'new task'] })))
    }

    return (
        <main className="add-note">
            <div className="add-note-modal">
                <h1>Add a new note</h1>
                <div className="note-details">
                    <input className="title" placeholder="Title" onChange={handleChange} value={note.title} name="title" />
                    {note.type === 'txt'
                        ?
                        <textarea placeholder="text" onChange={handleChange} value={note.txt} name='txt' />
                        : note.type === 'img'
                            ?
                            <input type='file' onChange={onUploadImg} name='url' />
                            : note.type === 'todos'
                                ?
                                note.todos.map((todo, idx) =>
                                    <div key={idx}>
                                        <input type='text' onChange={(ev) => handleChange(ev, idx)} value={todo} name='todos' />
                                        <button onClick={addTodo}>+</button>
                                    </div>
                                )
                                :
                                 <input type='video' onChange={handleChange} name='url' placeholder="Copy from youtube the url" />
                    }

                </div>
                <div className="type-btns">
                    <button title="Video" onClick={() => changeNoteType('video')} className={note.type === 'video' ? 'active' : ''}><FontAwesomeIcon icon={faPlayCircle} /></button>
                    <button title="List" onClick={() => changeNoteType('todos')} className={note.type === 'todos' ? 'active' : ''}><FontAwesomeIcon icon={faCircleCheck} /></button>
                    <button title="Text" onClick={() => changeNoteType('txt')} className={note.type === 'txt' ? 'active' : ''}><FontAwesomeIcon icon={faClipboard} /></button>
                    <button title="Image" onClick={() => changeNoteType('img')} className={note.type === 'img' ? 'active' : ''}><FontAwesomeIcon icon={faImage} /></button>
                </div>
                <button className="done-btn" onClick={onSaveNote}><FontAwesomeIcon icon={faCheck} /></button>
            </div>
            <div className="full-screen" onClick={openCloseModal}>
            </div>
        </main>
    )
}

