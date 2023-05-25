import { Route, HashRouter as Router, Routes } from "react-router-dom";

import { AppHeader } from "./cmps/app-header";
import { NoteIndex } from "./pages/note-index";

export function App() {
  return (
    <Router>
      <section className="app main-layout">
        <AppHeader />
        <main>
        <Routes>
          <Route path="/note" element={<NoteIndex />} />
        </Routes>
        </main>
      </section>
    </Router>
  );
}

