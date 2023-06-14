import { useSelector } from 'react-redux'
import note from '../assets/imgs/note.png'

import { NoteFilter } from './note-filter'
import { NavLink } from 'react-router-dom'
import { logout } from '../store/actions'
import { useEffect, useState } from 'react'

export function AppHeader() {
    const user = useSelector((storeState => storeState.notesModule.user))
    const [content, setContent] = useState('')

    useEffect(()=>{
        if(user) setContent(user.userName)
    },[user])

    function onLogout() {
        logout()
    }

    function changeContent(content){
        setContent(content)
    }

    return (
        <header className='full'>
            <div className='nav-area'>
                <img src={note} />
                <h1>Notes</h1>
            </div>
            <NoteFilter />
            {user ?
                <div className='user-icon' onMouseOver={() => changeContent('logout')} onMouseLeave={() => changeContent(user.userName)} onClick={onLogout}>
                    <h2>{content}</h2>
                </div>
                :
                <NavLink to='/login' className='login-btn'>
                    Login
                </NavLink>
            }
        </header>
    )
}