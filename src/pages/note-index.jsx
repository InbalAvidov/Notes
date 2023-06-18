import { useSelector } from "react-redux"
import { useEffect } from "react"

import { NoteList } from "../cmps/note-list"
import { loadNotes } from "../store/actions"
import { NoteAdd } from "../cmps/note-add"

export function NoteIndex() {
    const notes = useSelector((storeState => storeState.notesModule.notes))

    useEffect(() => {
        loadNotes()
    }, [])

    return <main className="main-notes">
        <NoteAdd />
        <NoteList notes={notes} />
    </main>

}
