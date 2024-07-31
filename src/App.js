
import React, {useState,useEffect} from 'react';
import './App.css';
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';

function App() {
  const [isCompletedScreen,setIsCompletedScreen] = useState(false);
  const [Todos, setTodos] = useState ([]);
  const [newTitle, setNewTitle] = useState ('');
  const [newDescription, setNewDescription] = useState ('');
  const [completedTodos, setCompletedTodos] = useState ([]);
  const [currentEdit,setCurrentEdit] = useState("");
  const [currentEditedItem,setCurrentEditedItem] = useState("");

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription};

    let updatedTodoArr = [...Todos];
    updatedTodoArr.push (newTodoItem);
    localStorage.setItem ('todolist', JSON.stringify (updatedTodoArr));
    setTodos (updatedTodoArr);
  }

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...Todos];
    reducedTodo.splice (index);

    localStorage.setItem ('todolist', JSON.stringify (reducedTodo));
    setTodos (reducedTodo);

  }

  const handleCompleteTodo = (index) => {
    let now = new Date ();
    let dd = now.getDate ();
    let mm = now.getMonth () + 1;
    let yyyy = now.getFullYear ();
    let h = now.getHours ();
    let m = now.getMinutes ();
    let s = now.getSeconds ();
    let completedOn =
      dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...Todos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push (filteredItem);
    setCompletedTodos (updatedCompletedArr);
    handleDeleteTodo (index);
    localStorage.setItem ('completedTodos',
      JSON.stringify (updatedCompletedArr)
    );
  };

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice (index);

    localStorage.setItem ('completedTodos', JSON.stringify (reducedTodo));
    setCompletedTodos (reducedTodo);

  }

  useEffect (() => {
    let savedTodo = JSON.parse (localStorage.getItem ('todolist'));
    if (savedTodo) {
      setTodos (savedTodo);
    }

    let savedCompletedTodo = JSON.parse (
      localStorage.getItem ('completedTodos')
    );
   

    if (savedCompletedTodo) {
      setCompletedTodos (savedCompletedTodo);
    }
  }, []);

  const handleEdit = (index,item)=>{
    console.log(index);
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  }

  const handleUpdateTitle = (value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,title:value}
    })
  }

  const handleUpdateDescription = (value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,description:value}
    })
  }

  const handleUpdateToDo = ()=>{
      let newToDo = [...Todos];
      newToDo[currentEdit] = currentEditedItem;
      setTodos(newToDo);
      setCurrentEdit("");
  }

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className='todo-wrapper'>
          <div className='todo-input'>
            <div className='todo-input-item'>
              <label>Title</label>
              <input type='text' placeholder='whats the task title?' value={newTitle} onChange={e => setNewTitle (e.target.value)}/>
            </div>
            <div className='todo-input-item'>
              <label>Description</label>
              <input type='text' placeholder='whats the task description?' value={newDescription} onChange={e => setNewDescription (e.target.value)}/>
            </div>
            <div className='todo-input-item'>
              <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
            </div>
          </div>
          <div className='btn-area'>
          <button className = {!isCompletedScreen?"active secondaryBtn": "secondaryBtn"} 
          onClick={() => setIsCompletedScreen(false)} >Todo</button>
          <button className = {isCompletedScreen? "active secondaryBtn": "secondaryBtn"} 
          onClick={() => setIsCompletedScreen(true)}>Completed</button> 

            {/* <button className={`secondaryBtn ${isCompletedScreen===false && 'active'}`} onClick={() => setIsCompletedScreen(false)} >Todo</button>
            <button className={`secondaryBtn ${isCompletedScreen===true && 'active'}`} onClick={() => setIsCompletedScreen(true)}>Completed</button> */}
          </div>
          <div className='todo-list'>
          {isCompletedScreen === false && Todos.map((item,index)=>{
            if(currentEdit===index){
              return(
              <div className='edit__wrapper' key={index}>
              <input placeholder='Updated Title' 
              onChange={(e)=>handleUpdateTitle(e.target.value)} 
              value={currentEditedItem.title}  />
              <textarea placeholder='Updated Title' 
              rows={4}
              onChange={(e)=>handleUpdateDescription(e.target.value)} 
              value={currentEditedItem.description}  />
                <button
          type="button"
          onClick={handleUpdateToDo}
          className="primaryBtn"
        >
          Update
        </button>
          </div> 
              ) 
          }else{
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <div>
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleDeleteTodo (index)}
                    title="Delete?"
                  />
                  <BsCheckLg
                    className="check-icon"
                    onClick={() => handleCompleteTodo (index)}
                    title="Complete?"
                  />
                  <AiOutlineEdit  className="check-icon"
                    onClick={() => handleEdit (index,item)}
                    title="Edit?" />
                </div>

              </div>
            );
          }
          
            })}
          {isCompletedScreen === true && completedTodos.map((item,index)=>{
              return(
                <div className='todo-list-item' key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><small>Completed on: {item.completedOn}</small></p>

              </div>
              <div>    
              <AiOutlineDelete onClick={()=>{handleDeleteCompletedTodo(index)}} title='Delete?' className="icon"/>
              </div>
            </div>
              )
            })} 
        </div>
      </div>
    </div>
    
  );
}

export default App;
