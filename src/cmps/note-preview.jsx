import { useEffect, useState } from "react"
import Swal from 'sweetalert2'


import { NoteContent } from "./note-content.jsx"
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faThumbTack, faPalette, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { loadNotes, pinNote, removeNote, saveNote, updateColor, updateNote } from "../store/actions.js"

export function NotePreview({ currNote }) {
    const [isColorsShown, setIsColorsShown] = useState(false)
    const [note, setNote] = useState(currNote)
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        setNote(currNote)
    }, [currNote])


    async function onChangeColor(ev) {
        ev.stopPropagation()
        const color = ev.target.value
        await updateColor(note, color)
        setIsColorsShown(false)
        loadNotes()
    }

    async function onPinNote(ev) {
        ev.stopPropagation()
        await pinNote(note, !note.isPinned)
        loadNotes()
    }

    function onPalette(ev) {
        ev.stopPropagation()
        setIsColorsShown(!isColorsShown)
    }

    async function onDeleteNote(ev) {
        ev.stopPropagation()
        try {
            const result = await Swal.fire({
                title: 'Do you want to delete this note?',
                text: 'You won\'t be able to reverse this!',
                showCancelButton: true,
                background: '#ffffff',
                color: '#000000',
                confirmButtonColor: '#40cde0',
                cancelButtonColor: '#000000',
                confirmButtonText: 'Yes, delete it!'
            })
            if (result.isConfirmed) {
                console.log('note:',note)
                await removeNote(note._id)
            }
        } catch (err) {
            console.log('cant Swal', err)
        }
    }

    function onEditNote() {
        setIsEdit(!isEdit)
        if(isEdit) updateNote(note)
    }

    return <div className={isEdit ? "note-preview edit" : "note-preview"} style={{ backgroundColor: `${note.color}` }} >
        <NoteContent note={note} setNote={setNote} isEdit={isEdit} />
            <div className="note-btns">
                <div>
                    <button title="Pin" onClick={onPinNote} className={note.isPinned ? "pin" : ""} style={{color : note.isPinned ? '#40cde0' : 'black'}}>
                        <FontAwesomeIcon icon={faThumbTack} />
                    </button>
                    <button title="Change-color" onClick={onPalette}><FontAwesomeIcon icon={faPalette} /></button>
                    {isColorsShown &&
                        <div className="colors">
                            <button onClick={onChangeColor} value='#FFFFFF' style={{ backgroundColor: '#FFFFFF', width: '20px', height: '20px', borderRadius: '50%' }}></button>
                            <button onClick={onChangeColor} value='#f9f2ec' style={{ backgroundColor: '#f9f2ec', width: '20px', height: '20px', borderRadius: '50%' }}></button>
                            <button onClick={onChangeColor} value='#B0E0E6' style={{ backgroundColor: '#B0E0E6', width: '20px', height: '20px', borderRadius: '50%' }}></button>
                            <button onClick={onChangeColor} value='#8FBC8F' style={{ backgroundColor: '#8FBC8F', width: '20px', height: '20px', borderRadius: '50%' }}></button>
                            <button onClick={onChangeColor} value='#DDA0DD' style={{ backgroundColor: '#DDA0DD', width: '20px', height: '20px', borderRadius: '50%' }}></button>
                            <button onClick={onChangeColor} value='#FFB6C1' style={{ backgroundColor: '#FFB6C1', width: '20px', height: '20px', borderRadius: '50%' }}></button>
                        </div>
                    }
                    <button className="delete-btn" onClick={onDeleteNote}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>
                <button className={isEdit ? "shown" : ""} onClick={onEditNote}>
                    <FontAwesomeIcon icon={isEdit ? faCheck : faEdit} />
                </button>
            </div>
    </div >

}







