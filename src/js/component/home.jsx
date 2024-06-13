import React, {useEffect, useState} from "react"; 

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
function TodoItem({ label, is_done, delete_todo, toggle_todo }) {
	return (
		<div className="todo-item">
			<input type="checkbox" checked={is_done} onChange={toggle_todo}/>
			<span className="todo-text">{label}</span>
			<button className="btn btn-danger" onClick={delete_todo}>
			Delete
			</button>
		</div>
	);
}

const Home = () => {
	const [todos, setTodos] = useState([]);
	const [todoInput, setTodoInput] = useState("");

	useEffect (() => {
		console.log("on mount useEffect")
		const local_todos = localStorage.getItem("todos");
		if (local_todos) {
			setTodos(JSON.parse(local_todos));
		}
}, []);


	useEffect (() => {
		console.log("on change useEffect")
		localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

	return (
		<>
		<form 
		onSubmit={(ev) => {
			ev.preventDefault();
			if (todoInput.length > 0){
				setTodos([
					{
						label: todoInput,
						is_done: false,
					},
					...todos,
				]);
				setTodoInput("");
			}
		}}
		className="container d-flex flex-column align-items-center justify-content-center">
			<h1>Todo List</h1>
			<input 
			class="form-control form-control-lg" 
			type="text" 
			placeholder="New Task!!" 
			aria-label="todolist Input field"
			value={todoInput}
			onChange={(ev) => setTodoInput(ev.target.value)}>
			</input>
			{todos.map((item, idx) => (
			<TodoItem 
			key={idx}
			label={item.label}
			is_done={item.is_done} 
			toggle_todo={() =>
				setTodos(
					todos.toSpliced(idx, 1, {
						label: item.label,
						is_done: item.is_done,
					})
				)
			} 
			delete_todo={() => {
				setTodos(todos.toSpliced(idx, 1));
				localStorage.setItem(
					"todos",
					JSON.stringify(todos.toSpliced(idx, 1))
				);
			}}
			/>
		))}
		<small>
			{todos.filter((item) => item.is_done).length} todos left to do!!
		</small>
		</form>
		</>
	);
}

export default Home;
