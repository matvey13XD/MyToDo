import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homePage';
import ListPage from './pages/listPage';
import { SET_LISTS } from './store/reducers/listsReducer';
import { SET_TASKS } from './store/reducers/tasksReducer';

function App() {
  const dispatch = useDispatch();
  const haveData = localStorage.getItem('haveData');
  useEffect(() => {
    if (haveData){
      dispatch({type: SET_LISTS, payload: JSON.parse(localStorage.getItem('lists'))})
      dispatch({type: SET_TASKS, payload: JSON.parse(localStorage.getItem("tasks"))})
  }
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route path={"/home"}>
          <HomePage/>
          </Route>
        <Route path={"/list/:id"}>
          <ListPage/>
          </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
