import { useEffect, useState } from "react"

import { NoteAdd } from "../cmps/note-add.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteService } from "../services/note-service.js"


export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(NoteService.getDefaultFilter())

    useEffect(() => {
        loadNotes()
    }, [filterBy])


    function loadNotes() {
        NoteService.query(filterBy)
            .then(notes => {
                setNotes(notes)
            })
    }

    return <main className="main-notes">
            <div className="note-section">
                <NoteFilter setFilterBy={setFilterBy} />
                <NoteAdd loadNotes={loadNotes} />
                {notes && <NoteList notes={notes} loadNotes={loadNotes} />}
                {!notes.length || !notes && <h2>No results...</h2>}
            </div>
    </main>

}
