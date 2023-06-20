import { useState } from "react"
import { faImage, faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";


import { noteService } from "../services/note.service"
import { uploadService } from "../services/upload.service"
import { login, loginAsGuest, saveNote, updateNote } from "../store/actions"
import Swal from "sweetalert2"

export function NoteAdd() {
    const [note, setNote] = useState(noteService.getEmptyNote())
    const user = useSelector((storeState => storeState.notesModule.user))
    const navigate = useNavigate()

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

    async function checkIfUser(){
        if (user) return
        else try {
            const result = await Swal.fire({
                title: 'Please login to create notes or continue as guest',
                text: 'If you choose to continue as a guest your information will be stored locally and you will not be able to access it from another device',
                showCancelButton: true,
                background: '#ffffff',
                color: '#000000',
                confirmButtonColor: '#40cde0',
                cancelButtonColor: '#000000',
                confirmButtonText: 'Login',
                cancelButtonText: 'Countinue as guest'
            })
            if (result.isConfirmed) {
                navigate('/login')
            } else loginAsGuest ()
        } catch (err) {
            console.log('cant Swal', err)
        }
    }

    return (
        <div className="note-preview add-note" onClick={checkIfUser}>
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

