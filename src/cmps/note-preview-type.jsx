

export function NotePreviewByType({ note}) {
    
    switch (note.type) {
        case 'note-txt':
            return <div className="note-content">
                <h3>{note.info.title}</h3>
                <p>{note.info.txt}</p>
            </div>
        case 'note-img':
            return <div className="note-content">
                <img className="note-img" src={note.info.url} />
                <h4>{note.info.title}</h4>
            </div>
        case 'note-todos':
            return <div className="note-content">
                <h3>{note.info.title}</h3>
                <ul>
                    {note.info.todos.map((todo, idx) => <li key={idx}>{todo.txt}</li>)}
                </ul>
            </div>
        case 'note-video':
            return <div className="note-content">
                <iframe width="100% "height="100%" src={`https://www.youtube.com/embed/${note.videoId}`} title="Youtube Player" frameBorder="0" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>
                <h3>{note.title}</h3>
            </div>
    }
}