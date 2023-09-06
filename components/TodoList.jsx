import React from 'react'
import { useState } from 'react'
import './TodoList.css'
import axios from 'axios'
import idGenerator from '../src/utils/idGenerator'


const TodoList = ( { initialTodoList } ) => {
   
    const data = [
        { id: 0, description: 'Get some milk' },
        { id: 1, description: 'Buy bread' },
        { id: 2, description: 'Do laundry' },
        { id: 3, description: 'Feed dog'}
    ]

    
    
    const [todo, setTodo] = useState('')
    const [list, setList] = useState([])
    const [editId, setEditId] = useState(0)
    
    // console.log(todo)


    const handleSubmit = async ( evt ) => {
        evt.preventDefault()
        console.log('test submit')

        try {
          const response = await axios.post('/api/todolist', {
            
            description: todo, 
          });
          console.log(response)
        console.log(response.data)
          const {description, id} = response.data;
          let newItem = { description, id }
      
   
          setList(response.data);
          setTodo(''); 
        } catch (error) {
          console.error('Error adding todo description:', error);
        }
      };
      

    // const handleSubmit = (evt) => {
    //     evt.preventDefault()

    //     if(editId){
    //         const editTodo = list.find((i) => i.id === editId)
    //         const updatedList = list.map((t) => 
    //             t.id === editTodo.id 
    //             ? (t = { id : t.id, todo })
    //             : { id : t.id, todo : t.todo }
    //         )

    //         setList(updatedList)
    //         setEditId(0)
    //         setTodo("")
    //         return
    //     }


    //     if(todo !== ''){
    //         setList([{ id: `${todo} - ${Date.now}`, todo }, ...list])
    //         console.log(todo)
    //         setTodo(" ")
    //     }

    // }


    // const handleDelete = (id) => {
        
    //     const delTodo = list.filter((to) => to.id !== id)
    //     setList([...delTodo])
    // }


    const handleDelete = async (id) => {
        console.log('test delete')
        const {data} = await axios.post(`/api/todolist/${id}/delete`,)

        const delTodo = list.filter((to) => to.id !== id)
        setList([...delTodo])
    
    }



    const handleEdit = async (id) => {
        console.log('testing the edit button')
        console.log(id)
        // const {data} = await axios.post(`/api/todolist/${initialTodoList.id}`)
            
        const editTodo = list.find((i) => i.id === id)
        setTodo(editTodo.description)
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
        onChange = {(evt) => {
            console.log(evt.target.value) 
            setTodo(evt.target.value)}}
        >

        </input>
        <button>{editId ? "Edit" : "Submit"}</button>
    </form>

        <ul className='allTodos'>
            {
                list.map((t) => (
                    <li className='singleTodo' key={t.id}>
                    <span className='todoText'> {t.description} </span>
                    <button onClick={() => handleEdit(t.id)}>edit</button>
                    <button onClick={() => handleDelete(t.id)}>delete</button>
                        </li>
                ))
            }

        </ul>



    {/* {data.map((list) => {
        return(

        <div key={list.id}>{list.description}</div>

        )
    })} */}
    </div>

    </div>

   )
}

export default TodoList