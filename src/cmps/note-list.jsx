// import { useEffect, useState } from "react"
// import { useSelector } from "react-redux"
// import { loadNotes } from "../store/actions"
// import { NotePreview } from "./note-preview"
// import { noteService } from "../services/note-service"

import { NotePreview } from "./note-preview";

export function NoteList({ notes }) {

    return <div className="note-list ">
        {notes.length > 0 ?
            notes.map(note => (
                <NotePreview currNote={note} />
            ))
            :
            <h2>No notes, create a new one now!</h2>
        }
    </div>

}

