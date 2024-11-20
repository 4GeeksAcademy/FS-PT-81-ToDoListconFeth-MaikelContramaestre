import React, { useEffect, useState } from "react";

export const AsyncToDo = () => {

  const url = 'https://playground.4geeks.com/todo';
  const [userData, setUserData] = useState({});
  const [todo, setToDo] = useState('');
  const [username, setUsername] = useState('');


  const getData = async e => {

    if (e) e.preventDefault();

    try {
      const response = await fetch(url + '/users/' + username);
      if (response.status == 404) return createUser();
      if (!response.ok) throw new Error("Algo esta mal");
      const data = await response.json();
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  }


  const createUser = async () => {

    try {
      const response = await fetch(url + '/users/' + username, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error("Algo esta mal");
      const data = await response.json()
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  }


  const handleSubmit = async e => {

    e.preventDefault();
    if (todo.trim() === '') {alert('Debes agregar una tarea'); return;}
    try {
      const response = await fetch(url + '/todos/' + username, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: todo,
          done: false
        })
      });
      if (!response.ok) throw new Error("Algo esta mal agregando al usuario");
      const data = await response.json()
      console.log(data);
      setToDo('');
      getData()
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (todo_id) => {

    try {
      const response = await fetch(url + '/todos/' + todo_id, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error("Algo esta mal");
      getData();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [])


  return (

    <>
    <div className="container fondoBase">
      <div>
        <form onSubmit={getData}>
          <input className="boton" type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </form>
        <form onSubmit={handleSubmit}>
        <h4>Agregar tareas</h4>
          <input className="boton" type="text" placeholder="Agrega una tarea" value={todo} onChange={e => setToDo(e.target.value)} />
          <button className="btn btn-secondary mb-1">Agregar</button>
        </form>
      </div>
      <div className="container fondo ">
            <ul>
                {userData?.todos?.map(elem => <li key={elem.id}>{elem.label} <span className="fa-solid fa-trash" onClick={() => handleDelete(elem.id)}> </span></li>)}
            </ul> 
      </div>
     
      </div>
    </>
  );
};