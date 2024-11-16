import React, { useEffect, useState } from "react";

export const ToDoList = () => {
    const url = 'https://playground.4geeks.com/todo';
    const [username, setUsername] = useState('');
    const [todo, setTodo] = useState('');
    const [data, setData] = useState({});

    const getUserData = () => {
        fetch(url + '/users/' + username)
            .then(response => {
                if (response.status === 404) return newUser();
                if (!response.ok) throw new Error('Error buscando el usuario');
                return response.json();
            })
            .then(datos => {
                console.log(datos);
                setData(datos);
            })
            .catch(error => console.log('Error buscando el usuario', error));
    };

    const newUser = () => {
        fetch(url + '/users/' + username, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('Error agregando al usuario');
            return response.json();
        })
        .then(datos => console.log('Usuario creado', datos))
        .catch(error => console.log('Error creando al usuario', error));
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (todo.trim() === '') {alert('Debes agregar una tarea'); return;}
        fetch(url + '/todos/' + username, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ label: todo, done: false })
        })
        .then(response => {
            if (!response.ok) throw new Error('Error agregando la tarea');
            return response.json();
        })
        .then(datos => {
            console.log('Tarea creada', datos);
            getUserData();
            setTodo('');
        })
        .catch(error => console.log('Error al agregar la tarea', error));
    };

    const handleDelete = todo_id => {
        fetch(url + '/todos/' + todo_id, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) throw new Error('Error eliminando la tarea');
            getUserData();
        })
        .catch(error => console.log('Error al eliminar la tarea', error));
    };

    const validation = e => {
        e.preventDefault();
        getUserData()
    }

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <>
          <div className="container fondoBase">
            <div className="container">
                 <form onSubmit={validation}>
                    <input className="boton" type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
                </form> 
            </div>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h4>Agregar tareas</h4>
                    <input className="boton" type="text" value={todo} onChange={e => setTodo(e.target.value)} />
                    <button className="btn btn-secondary mb-1" >Agregar</button>
                </form>
                <div className="container fondo ">
                <ul>
                    {data.todos?.map(elem => (
                        <li key={elem.id}>
                            {elem.label}
                            <span className="fa-solid fa-trash" onClick={() => handleDelete(elem.id)}> </span>
                        </li>
                    ))}
                </ul>

                </div>
            
            </div>
            </div>
        </>
    );
};