import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

import note from '../assets/imgs/logo.jpg'
import { NoteFilter } from './note-filter'
import { loadNotes, logout } from '../store/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-regular-svg-icons'

export function AppHeader() {
    const user = useSelector((storeState => storeState.notesModule.user))
    const [content, setContent] = useState('')
    const [isShowLogout, setIsShowLogout] = useState(false)

    useEffect(() => {
        if (user) setContent(user.userName)
    }, [user])

    function onLogout() {
        logout()
        loadNotes()
    }

    function changeContent(content) {
        setContent(content)
    }

    return (
        <header className='full'>
            <div className='logo-area'>
                <img src={note} />
                <h1>Notes</h1>
            </div>
            {user && <NoteFilter />}
            {user ?
                <div className={ isShowLogout ? 'show-logout user-icon' : 'user-icon'} onMouseOver={() => changeContent('logout')} onMouseLeave={() => changeContent(user.userName)} >
                    <h2 onClick={onLogout}>
                        {content}
                    </h2>
                        <FontAwesomeIcon icon={faUser} onClick={()=>setIsShowLogout(!isShowLogout)} />
                </div>
                :
                <NavLink to='/login' className='login-btn'>
                    Login
                </NavLink>
            }
        </header>
    )
}