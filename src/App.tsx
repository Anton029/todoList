import React, { useState } from 'react';
import { Header } from './components/header/header';
import { TodoList } from './components/todo-list';
import { AddItemPopup } from './components/add-item-popup/addItemPopup';
import { globalStateContext } from './globalState'
import './index.css'

function App() {

	const todoArr = JSON.parse(localStorage.todolist ? localStorage.todolist : '[]')

	const [todoList, setTodoList] = useState(todoArr)

	console.log(todoList)

	const [isAddItemPopupOpen, setAddItemPopupState] = useState(false)

	return (
		<globalStateContext.Provider value={[ todoList, setTodoList, isAddItemPopupOpen, setAddItemPopupState ]}>
			<div className="App">
				<Header />
				<TodoList list={todoList}/>
				<AddItemPopup />
			</div>
		</globalStateContext.Provider>
  );
}

export default App;
