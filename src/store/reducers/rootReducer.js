import { combineReducers } from "redux"
import { listsReducer } from "./listsReducer"
import { tasksReducer } from "./tasksReducer"

export const rootReducer = combineReducers({
    lists: listsReducer,
    tasks: tasksReducer,
})