import { createStore, combineReducers } from 'redux'
import { NotesReducer } from './reducer.js'


const rootReducer = combineReducers({
    notesModule: NotesReducer,
   
})

const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)


store.subscribe(() => {
    // console.log('storeState:\n', store.getState())
})



