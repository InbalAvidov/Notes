import { useEffect, useState } from "react"

import { NotePreviewByType } from "./note-preview-type.jsx"
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faThumbTack, faPalette } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { loadNotes, pinNote, removeNote, updateColor } from "../store/actions.js"

export function NotePreview({ currNote, openCloseModal }) {
    const [isColorsShown, setIsColorsShown] = useState(false)
    const [note, setNote] = useState(currNote)

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
        await pinNote(note , !note.isPinned)
        loadNotes()
    }

    function onPalette(ev) {
        ev.stopPropagation()
        setIsColorsShown(!isColorsShown)
    }

    async function onDeleteNote(ev) {
        ev.stopPropagation()
        try {
            await removeNote(note._id)
        } catch (err) {
            console.log(err)
        }
    }

    return <div onClick={() => openCloseModal(note)} className="note-preview" style={{ backgroundColor: `${note.color}`, boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }} >
        <NotePreviewByType note={note} setNote={setNote} />
        <div className=" note-btns">
            <button title="Pin" onClick={onPinNote} className={note.isPinned ? "pin" : ""}>
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
    </div >

}






