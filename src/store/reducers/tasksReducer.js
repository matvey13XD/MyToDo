
const initialState = {
    tasks: [],
}

export const ADD_TASK_TO_LIST = "ADD_TASK_TO_LIST";
export const DELETE_TASK = "DELETE_TASK_FROM_LIST";
export const DELETE_TASKS_FROM_LIST = "DELETE_TASKS_FROM_LIST";
export const SET_TASKS = "SET_TASKS";

export const tasksReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_TASK_TO_LIST:
            return {tasks: [...state.tasks, action.payload]}
        case DELETE_TASK:
            return {tasks: state.tasks.filter(task => task.id != action.payload)}
        case DELETE_TASKS_FROM_LIST:
            return {tasks: state.tasks.filter(task => task.listId != action.payload)}
        case SET_TASKS:
            return {tasks: action.payload}
        default:
            return state;
    }
}

