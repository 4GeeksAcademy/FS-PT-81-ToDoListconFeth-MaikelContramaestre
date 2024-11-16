import React from "react";
import { AsyncToDo } from "./asyn.jsx";
import { ToDoList } from "./todolist.jsx";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			
				<div className="row">
					<div className="col-6 primero">

						<h3 className="titulo text-dark d-flex" >Hecho con .then.catch</h3>
						<ToDoList/>
					</div>
					<div className="col-6 segundo">
						<h3 className="titulo text-dark d-flex">Hecho con Asincronia</h3>
						<AsyncToDo/>
					</div>
				</div>

		</div>
	);
};

export default Home;
