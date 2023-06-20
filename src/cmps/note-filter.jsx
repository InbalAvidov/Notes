import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbTack } from '@fortawesome/free-solid-svg-icons'

import { noteService } from "../services/note.service"
import { loadNotes } from "../store/actions"


export function NoteFilter() {
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [isPinnedNotes, setIsPinnedNotes] = useState(false)

    useEffect(() => {
        console.log('filterBy:', filterBy)
        loadNotes(filterBy)
    }, [filterBy])

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterBy((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function pinnedNotes() {
        setIsPinnedNotes(!isPinnedNotes)
        setFilterBy((prevFilter) => ({ ...prevFilter, 'pin': !isPinnedNotes }))
    }

    return <div className='filter-area'>
        <div className="search-bar">
            <input name="txt" placeholder="Search" value={filterBy.txt} onChange={handleChange} />
            <button className='search'>
                <svg fill="#727272" role='img' height='22' width='22' aria-hidden='true' className='Svg-sc-ytk21e-0 uPxdw search-icon' viewBox='0 0 24 24' data-encore-id='icon'><path d='M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z'></path></svg>
            </button>
        </div>
        <div className={isPinnedNotes ? 'pinned pin-filter-box' : "pin-filter-box"} onClick={pinnedNotes}>
            <FontAwesomeIcon icon={faThumbTack} style={{ fontSize: '16px', color: isPinnedNotes ? 'white' : 'gray' }} />
        </div>
    </div>
}