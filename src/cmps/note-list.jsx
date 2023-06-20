import { NotePreview } from "./note-preview";

export function NoteList({ notes }) {

    return <div className="note-list ">
        {notes.length > 0 ?
            notes.map(note => (
                <NotePreview currNote={note} />
            ))
            :
            <h2>No <span>Notes</span>, create a new one now!</h2>
        }
    </div>
}

