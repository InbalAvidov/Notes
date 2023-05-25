import note from '../assets/imgs/note.png'

export function AppHeader() {
    return (
        <header>
            <svg ole="img" height="30" width="30" aria-hidden="true" viewBox="0 0 24 24" fill="#525252" focusable="false" >
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </svg>
            <img src={note}/>
            <h1>Notes</h1>
        </header>
    )
}