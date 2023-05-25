import { useEffect, useState } from "react"
import { NotePreview } from "./note-preview"

export function NoteList({ notes, loadNotes }) {
    const [pinned, setPinned] = useState([])
    const [unPinned, setUnPinned] = useState([])

    useEffect(() => {
        filterByPin()
    }, [notes])

    function filterByPin() {
        setPinned(notes.filter(note => note.isPinned === true))
        setUnPinned(notes.filter(note => note.isPinned === false))
    }

    return <div className="note-list">
        {pinned.length > 0 &&
            <div className="pinned-note">
                <p>pinned <span className="fa-solid fa-pin"></span></p>
                {pinned.map((note, idx) => <NotePreview key={idx} note={note} loadNotes={loadNotes} />)}
            </div>
            }
        {unPinned.length > 0 && <div className="un-pinned">
            {
                unPinned.map((note, idx) => <NotePreview key={idx} note={note} loadNotes={loadNotes} />)
            }
        </div>}
    </div>

}

