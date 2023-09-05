import React from 'react'
import { useState } from 'react'
import './TodoList.css'
import idGenerator from '../src/utils/idGenerator'


const TodoList = ( { initialTodoList } ) => {
   
    const data = [
        { id: 0, item: 'Get some milk' },
        { id: 1, item: 'Buy bread' },
        { id: 2, item: 'Do laundry' },
        { id: 3, item: 'Feed dog'}
    ]

    console.log('test one')


    const [todo, setTodo] = useState('')
    const [list, setList] = useState([initialTodoList])
    const [editId, setEditId] = useState(0)
 


    // const handleSubmit = async ( evt ) => {
    //     try {
    //       const response = await axios.post('/api/todolist', {
    //         description: 'Description', // 'todo' is the description value from your state
    //       });
      
    //       const newItem = response.data;
      
    //       // Update the React state with the new item
    //       setList((prevList) => [...prevList, newItem]);
    //       setTodo(''); // Clear the input field
    //     } catch (error) {
    //       console.error('Error adding todo item:', error);
    //     }
    //   };
      

    const handleSubmit = (evt) => {
        evt.preventDefault()

        if(editId){
            const editTodo = list.find((i) => i.id === editId)
            const updatedList = list.map((t) => 
                t.id === editTodo.id 
                ? (t = { id : t.id, todo })
                : { id : t.id, todo : t.todo }
            )

            setList(updatedList)
            setEditId(0)
            setTodo("")
            return
        }


        if(todo !== ''){
            setList([{ id: `${todo} - ${Date.now}`, todo }, ...list])
            console.log(todo)
            setTodo(" ")
        }

    }


    const handleDelete = (id) => {
        const delTodo = list.filter((to) => to.id !== id)
        setList([...delTodo])
    }


    const handleEdit = (id) => {
        const editTodo = list.find((i) => i.id === id)
        setTodo(editTodo.todo)
        setEditId(id)
    }

    return (

    <div className="App">
    <div className="Container">
    <h1> CRUD List</h1>

    <form className='todoForm' onSubmit={handleSubmit}>
        <input  
        type = "text" 
        value={todo}
        onChange = {(evt) => setTodo(evt.target.value)}
        >

        </input>
        <button>{editId ? "Edit" : "Submit"}</button>
    </form>

        <ul className='allTodos'>
            {
                list.map((t) => (
                    <li className='singleTodo' key={t.id}>
                    <span className='todoText'> {t.todo} </span>
                    <button onClick={() => handleEdit(t.id)}>edit</button>
                    <button onClick={() => handleDelete(t.id)}>delete</button>
                        </li>
                ))
            }
            <li>
        <span> Learn React </span>
        <button>edit</button>
        <button>delete</button>
            </li>

            <li>
        <span> Learn Express </span>
        <button>edit</button>
        <button>delete</button>
            </li>
        </ul>



    {data.map((list) => {
        return(

        <div key={list.id}>{list.item}</div>

        )
    })}
    </div>

    </div>

   )
}

export default TodoList
