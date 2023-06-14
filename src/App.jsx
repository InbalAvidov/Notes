import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { Provider } from "react-redux";

import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

import { AppHeader } from "./cmps/app-header";
import { NoteIndex } from "./pages/note-index";
import { store } from "./store/store.js";
import { NoteAdd } from "./cmps/note-add";
import { LoginSignup } from "./pages/login-signup";


export function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="app main-layout">
          <AppHeader />
          <main className="main-layout">
            <Routes>
              <Route path="/" element={<NoteIndex />} />
              <Route path="/login" element={<LoginSignup />} />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  );
}

library.add(far, fas)
