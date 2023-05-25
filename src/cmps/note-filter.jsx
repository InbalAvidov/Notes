import { useEffect, useState } from "react"
import { NoteService } from "../services/note-service"


export function NoteFilter({ setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(NoteService.getDefaultFilter())
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field } = target
        if (field === 'pin') {
            setChecked(!checked)
            value = !checked
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        setFilterBy(filterByToEdit)
    }

    return <div className="note-filter">
            <label htmlFor="pin"><span className="fa-solid fa-pin"></span>
                <input style={{ accentColor: 'black' }} name="pin" id="pin" type="checkbox" onChange={handleChange} />
            </label>
            <div className="search-bar">
                <input name="txt" placeholder="search..." value={filterByToEdit.txt} onChange={handleChange} />
                <button onSubmit={onSubmitFilter}><span className="fa-solid fa-search"></span></button>
            </div>
            <label htmlFor="type" className="label-type">
                <select className="select-type" name="type" id="type" onChange={handleChange}>
                    <option name="type" value="">All</option>
                    <option name="type" value="note-txt">Text</option>
                    <option name="type" value="note-todos">List</option>
                    <option name="type" value="note-img">Image</option>
                    <option name="type" value="note-video">video</option>
                </select>
            </label>
    </div>
}