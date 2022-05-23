import { useRef } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ItemList } from "../components/itemList"
import Modal from "../components/modal/modal"
import MyInput from "../components/UI/myInput"
import { ADD_LIST } from "../store/reducers/listsReducer"

const HomePage = () => {
    const lists = useSelector(state => state.lists.lists)
    const tasks = useSelector(state => state.tasks.tasks)
    const [modalactive, setModalActive] = useState(false);
    const nameRef = useRef()
    const dispatch = useDispatch();
    
    const addNewList = () => {
        dispatch({type: ADD_LIST, payload: {name: nameRef.current.value, id: Date.now()}})
        setModalActive(false)
        nameRef.current.value = "";
    }   

    const saveAll = () => {
        localStorage.setItem('haveData', JSON.stringify(true))
        localStorage.setItem('tasks', JSON.stringify(tasks))
        localStorage.setItem('lists', JSON.stringify(lists))
    }

    useEffect(() => {
        console.log(lists)
    }, [])
    return (
        <div>
            <h1 style={{marginBottom: "30px"}}>Home</h1>
            {lists.length != 0
            ?
            <div style={{display: "grid", justifyContent: "center", width: "100%", rowGap: "30px"}}>
                {lists.map(list =>{
                    return <ItemList key={list.id} id={list.id} name={list.name}/>
                })}
            </div>
            :
            <h1>Вы еще не создали не одного списка</h1>
            }
            <button style={{marginTop: "20px", width: "300px", height: "50px"}} type="button" className="btn btn-primary" onClick={() => setModalActive(true)}>Добавить список</button>
            <Modal active={modalactive} setActive={setModalActive}>
            <div>
                <h3>Введите название: </h3>
                <br/>
                <MyInput nameRef={nameRef}/>
                <br/>
                <button onClick={addNewList} style={{marginTop: "20px", width: "300px", height: "50px"}} type="button" className="btn btn-primary">Добавить</button>
            </div>
            </Modal>
            <br/>
            <button onClick={saveAll} style={{marginTop: "20px", width: "300px", height: "50px"}} type="button" className="btn btn-success">Сохранить все</button>
        </div>
    )   
}

export default HomePage;