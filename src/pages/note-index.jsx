import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

import { NoteList } from "../cmps/note-list"
import { loadNotes } from "../store/actions"
import { NoteAdd } from "../cmps/note-add"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function NoteIndex() {
    const notes = useSelector((storeState => storeState.notesModule.notes))

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editNote, setEditNote] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

    function openCloseModal(note) {
        setEditNote(note || null)
        setIsModalOpen(!isModalOpen)
    }

    return <main className="main-notes">
        {isModalOpen && <NoteAdd openCloseModal={openCloseModal} editNote={editNote} />}
        <div className="add-note-btn" onClick={() => openCloseModal()}>
            <FontAwesomeIcon icon={faPlus} />
        </div>
        <NoteList notes={notes} openCloseModal={openCloseModal} />
    </main>

}
