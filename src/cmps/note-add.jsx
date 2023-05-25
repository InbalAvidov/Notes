import { useEffect, useState } from "react"
import { NoteService } from "../services/note-service"

export function NoteAdd({ loadNotes, note, setIsEdit }) {
    const [noteType, setNoteType] = useState('note-txt')
    const [content, setContent] = useState({ title: '', txt: '' })

    useEffect(() => {
        if (!note) return
        setContent(NoteService.getNoteContent(note))
    }, [])

    function onAddNote() {
        NoteService.addNote(content, noteType, false).then(note => {
            setContent({ title: '', txt: '' })
            loadNotes()
        })
    }

    function onSaveNote(ev) {
        ev.stopPropagation()
        NoteService.addNote(content, note.type, note.isPinned).then(() =>
            NoteService.remove(note.id))
            .then(() => {
                setIsEdit(false)
                loadNotes()
            })

    }

    function handleChange({ target }) {
        const { value, name: field } = target
        setContent((prevContent) => ({ ...prevContent, [field]: value }))
    }

    function onImgInput(ev) {
        loadImageFromInput(ev, setContent)
    }

    function loadImageFromInput(ev, onImageReady) {
        const reader = new FileReader()
        reader.onload = (event) => {
            let img = new Image()
            img.src = event.target.result
            img.onload = () => onImageReady(img.src)
        }
        reader.readAsDataURL(ev.target.files[0])
    }

    return <div className="note-add flex space-between">
        <div className="note-add-input">
            <input className="title" placeholder="Title" onChange={handleChange} value={content.title} name="title" />
            <input className="text" placeholder={noteType === 'note-img' ? "upload a photo" : noteType === 'note-todos' ? 'Task,task...' : noteType === 'note-txt' ? 'text...' : 'https://youtu.be/XXXXXXX'} onChange={handleChange} value={content.txt} name="txt" />
        </div>
        {!note && <div className="note-add-btns">
            <button onClick={() => setNoteType('note-img')} className={noteType === 'note-img' ? 'active' : ''}>
                <input id="img" style={{ display: 'none' }} type="file" className="file-input btn" onChange={onImgInput} />
                <label htmlFor="img" className="fa-regular fa-image" title="Upload photo"></label>
            </button>
            <button title="Video" onClick={() => setNoteType('note-video')} className={noteType === 'note-video' ? 'active' : ''}><span className="fa-solid fa-play"></span></button>
            <button title="List" onClick={() => setNoteType('note-todos')} className={noteType === 'note-todos' ? 'active' : ''}><span className="fa-solid fa-list"></span></button>
            <button title="Text" onClick={() => setNoteType('note-txt')} className={noteType === 'note-txt' ? 'active' : ''}><span className="fa-solid fa-edit"></span></button>
            <button className="note-add-btn" onClick={onAddNote}>Add</button>
        </div>}
        {note &&
            <div>
                <button onClick={onSaveNote}><span className="fa-solid fa-done" ></span></button>
                {note.type === 'note-img' &&
                    <button>
                        <input id="img" style={{ display: 'none' }} type="file" className="file-input btn" onChange={onImgInput} />
                        <label htmlFor="img" className="fa-regular fa-image" title="Upload photo"></label>
                    </button>}
            </div>}
    </div>
}