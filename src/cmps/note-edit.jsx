import { NoteAdd } from "./note-add.jsx"

export function NoteEdit({note , loadNotes , setIsEdit}) {
    return <NoteAdd note={note}  loadNotes={loadNotes} setIsEdit={setIsEdit} />
}