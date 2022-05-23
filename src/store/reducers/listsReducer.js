
const defualtState = {
    lists: [],
}

export const listsReducer = (state = defualtState, action) => {
    switch (action.type){
        case ADD_LIST:
            return {lists: [...state.lists, action.payload]}
        case DELETE_LIST:
            return {lists: state.lists.filter(list => list.id != action.payload)}
        case SET_LISTS:
            return {lists: action.payload}
        default: 
            return state;
    }
}

export const ADD_LIST = "ADD_LIST";
export const DELETE_LIST = "DELETE_LIST";
export const SET_LISTS = "SET_LISTS";