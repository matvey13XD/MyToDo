import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { DELETE_LIST } from "../store/reducers/listsReducer";
import { DELETE_TASK, DELETE_TASKS_FROM_LIST } from "../store/reducers/tasksReducer";

export const ItemList = ({name, id}) => {
    const tasks = useSelector(state => state.tasks.tasks)
    const lists = useSelector(state => state.lists.lists)
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteList = (e) => {
        e.stopPropagation();
        dispatch({type: DELETE_LIST, payload: id});
        dispatch({type: DELETE_TASKS_FROM_LIST, payload: id})
    }

    return (
        <div style={{border: "1px solid black", padding: "50px, 0px 0px 0px",}}>
            <h2 style={{padding: "0px 50px 0px 50px"}}>{name}</h2>
            <h3>{"Количество елементов: " + tasks.filter(task => task.listId == id).length}</h3>
            <button onClick={() => history.push("/list/" + id)} style={{margin: "0px 0px 0px 0px", width: "50%", borderRadius: "0px"}} className="btn btn-primary">Enter</button>
            <button onClick={(e) => deleteList(e)} style={{margin: "0px 0px 0px 0px", width: "50%",  borderRadius: "0px"}} className="btn btn-danger">Delete</button>
        </div>
    )
}