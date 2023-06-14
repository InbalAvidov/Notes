import { useState } from "react"


export function NotePreviewByType({ note }) {

    switch (note.type) {
        case 'txt':
            return <div className="note-content">
                <h1>{note.title}</h1>
                <pre>{note.txt}</pre>
            </div>
        case 'img':
            return <div className="note-content">
                <h1>{note.title}</h1>
                <img className="note-img" src={note.url} />
            </div>
        case 'todos':
            return <div className="note-content">
                <h1>{note.title}</h1>
                <ul>
                    {note.todos.map((todo, idx) => <li className="todo" key={idx}>
                        <input style={{ accentColor: 'gray', margin: '5px' }} type='checkbox' onClick={(ev)=>ev.stopPropagation()}/>
                        {todo}
                    </li>)}
                </ul>
            </div>
        case 'video':
            return <div className="note-content">
                <h1>{note.title}</h1>
                <iframe width="100% " height="100%" src={`https://www.youtube.com/embed/${note.videoId}`} title="Youtube Player" frameBorder="0" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
            </div>
    }
}