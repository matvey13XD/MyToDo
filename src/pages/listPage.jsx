import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { ADD_TASK_TO_LIST, DELETE_TASK } from "../store/reducers/tasksReducer";
import Modal from "../components/modal/modal";
import MyInput from "../components/UI/myInput";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const ListPage = () => {
    const params = useParams();
    const tasks = useSelector(state => state.tasks.tasks);
    const lists = useSelector(state => state.lists.lists)
    const checkRef = useRef();
    const [already, setAlready] = useState([]);
    const dispatch = useDispatch();
    const [modalactive, setModalActive] = useState();
    const nameRef = useRef();
    const addTask = () => {
        dispatch({type: ADD_TASK_TO_LIST, payload: {name: nameRef.current.value, id: Date.now(), listId: params.id}})
        nameRef.current.value = "";
        setModalActive(false);
    }

    const deleteTask = (id) => {
        dispatch({type: DELETE_TASK, payload: id})
    }

    const check = (checked, task) => {
        if (checked){
            setAlready([...already, task])
            deleteTask(task.id);
        }
        else{
           dispatch({type: ADD_TASK_TO_LIST, payload: task})
           setAlready(already.filter(item => item.id != task.id));
        }
    }

    return(
        <div>
            {console.log(tasks)}
            <h1>{"Список: " + lists.filter(list => list.id == params.id)[0].name}</h1>
            <button onClick={() => setModalActive(true)} className="btn btn-primary">Добавить запись</button>
            
                <TransitionGroup style={{display: "grid", width: "100%", paddingBottom: "80px", border: "1px solid black", justifyContent: "center", rowGap: "30px", marginTop: "20px"}}>
                {tasks.map(task => {
                if (task.listId == params.id)
                return (
                    <CSSTransition key={task.id} timeout={500} classNames="task">
                        <div style={{border: "2px solid aqua", width: "60vw", display: "flex", justifyContent: "space-between", minHeight: "60px"}}>
                        <div>
                            <input onChange={(e) => check(e.currentTarget.checked,task)} style={{marginLeft: "5px"}} type={"checkbox"} />
                            <span style={{padding: "10px 0px 2px 5px", display: "inline-block", fontSize: "20px", fontWeight: "600", textAlign: "start", wordBreak: "break-all"}}>{task.name}</span>
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <button style={{margin: "0px 10px 0px 60px"}} className="btn btn-primary" onClick={() => deleteTask(task.id)}>Удалить</button>
                        </div>
                    </div>
                    </CSSTransition>
                )
            })}
                            </TransitionGroup>
            <Modal active={modalactive} setActive={setModalActive}>
            <div>
                <h3>Введите название: </h3>
                <br/>
                <MyInput nameRef={nameRef}/>
                <br/>
                <button onClick={addTask} style={{marginTop: "20px", width: "300px", height: "50px"}} type="button" className="btn btn-primary">Добавить</button>
            </div>
            </Modal>
            <h1 style={{textAlign: "center"}}>Отмеченые елементы</h1>
            <TransitionGroup style={{display: "grid", width: "100%", paddingBottom: "80px", border: "1px solid black", justifyContent: "center", rowGap: "30px", marginTop: "20px"}}>
            {already.map(task => {
                return (
                    <CSSTransition key={task.id} timeout={500} classNames="task">
                        <div style={{border: "2px solid aqua", width: "60vw", display: "flex", justifyContent: "space-between", minHeight: "60px"}}>
                        <div>
                        <input checked={true} onChange={(e) => check(e.currentTarget.checked,task)} style={{marginLeft: "5px"}} type={"checkbox"} />
                            <span style={{padding: "10px 0px 2px 5px", display: "inline-block", fontSize: "20px", fontWeight: "600", textAlign: "start", wordBreak: "break-all"}}>{task.name}</span>
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <button style={{margin: "0px 10px 0px 60px"}} className="btn btn-primary" onClick={() => deleteTask(task.id)}>Удалить</button>
                        </div>
                    </div>
                    </CSSTransition>
                )
            })}
            </TransitionGroup>
        </div>
    )
}

export default ListPage;