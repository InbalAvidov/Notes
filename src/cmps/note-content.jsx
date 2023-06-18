import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { uploadService } from "../services/upload.service"

export function NoteContent({ note, isEdit, setNote }) {

    function handleChange({ target }, idx) {
        const { value, name: field } = target
        if (field === 'todos' && idx !== undefined) {
            note.todos[idx] = value
            setNote((prevContent) => ({ ...prevContent, 'todos': note.todos }))
        }
        else setNote((prevContent) => ({ ...prevContent, [field]: value }))
    }

    async function onUploadImg(ev) {
        try {
            await onSelectImg(ev)
        } catch (err) {
            console.log('err:', err)
        }
    }

    async function onSelectImg(ev) {
        try {
            const imgUrl = await uploadService.uploadImg(ev)
            setNote((prevContent) => ({ ...prevContent, url: imgUrl }))
        } catch (err) {
            console.log('Cant set image', err)
        }
    }

    return isEdit ?
        <div className="note-content">
            {<input className="title" onChange={handleChange} value={note.title} name="title" />}
            {note.url &&
                <div className="upload-img" >
                    <input type="file" onChange={onUploadImg} title="Upload photo" />
                    <img className="img" src={note.url} />
                    <FontAwesomeIcon />
                </div>
            }
            <input value={note.txt} onChange={handleChange} name="txt" className="txt" placeholder="Add text" />
            <ul>
                {note.todos.map((todo, idx) => <li className="todo txt" key={idx}>
                    <input style={{ accentColor: 'gray', margin: '5px' }} type='checkbox' onClick={(ev) => ev.stopPropagation()} />
                    <input className="todo-edit" type="text" value={todo} onChange={(ev) => handleChange(ev, idx)} name="todos" />
                </li>)}
            </ul>
        </div >
        :
        <div className="note-content">
            <h1>{note.title}</h1>
            {note.url && <img className="img" src={note.url} />}
            {note.txt && <pre className="txt">{note.txt}</pre>}
            {note.todos && <ul>
                {note.todos.map((todo, idx) => <li className="todo txt" key={idx}>
                    <input style={{ accentColor: 'gray', margin: '5px' }} type='checkbox' onClick={(ev) => ev.stopPropagation()} />
                    {todo}
                </li>)}
            </ul>}
        </div>
}
