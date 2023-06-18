import { useState } from "react"
import { faImage, faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


import { noteService } from "../services/note-service"
import { uploadService } from "../services/upload.service"
import { saveNote, updateNote } from "../store/actions"

export function NoteAdd() {
    const [note, setNote] = useState(noteService.getEmptyNote())

    function handleChange({ target }, idx) {
        const { value, name: field } = target
        if (field === 'todos' && idx !== undefined) {
            console.log('idx:',idx)
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
        } catch (err) {
            console.log('Cant set image', err)
        }
    }

    async function onSaveNote() {
        try {
            if (note._id) await updateNote(note)
            else {
                await saveNote(note)
                setNote(noteService.getEmptyNote)
            }
        } catch (err) {
            console.log(err)
        }
    }

    function addTodo() {
        if (!note.todos) note.todos = []
        setNote((prevNote) => ({ ...prevNote, 'todos': [...note.todos, ''] }))
    }

    return (
        <div className="note-preview add-note">
            <input className="title" placeholder="Add title" onChange={handleChange} value={note.title} name="title" />
            {note.url && <img src={note.url} />}
            <input type="text" placeholder="Add text " onChange={handleChange} value={note.txt} name='txt' />
            {note.todos &&
                note.todos.map((todo , idx) => (<div className="add-todo">
                    <input className="checkbox" type="checkbox" />
                    <input type="text" placeholder="Add todo " onChange={(ev)=>handleChange(ev , idx)} value={todo} name='todos' />
                </div>
                )
                )
            }
            <div className="note-add-btns">
                <button title="List" onClick={addTodo}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                </button>
                {!note.url && <button
                    title="Add image" className={note.type === 'img' ? 'active' : ''} >
                    <input className="file-input" type="file" onChange={onUploadImg} />
                    <FontAwesomeIcon icon={faImage} />
                </button>}
                <button className="add-btn" onClick={onSaveNote}><FontAwesomeIcon icon={faPlus}/></button>
            </div>
        </div>
    )
}

