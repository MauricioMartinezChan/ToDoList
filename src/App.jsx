import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const todo = {
        id: new Date().getTime(),
        text: newTodo
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const startEditTodo = (id, text) => {
    setEditTodoId(id);
    setEditTodoText(text);
  };

  const updateTodo = () => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === editTodoId) {
        return { ...todo, text: editTodoText };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditTodoId(null);
    setEditTodoText('');
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h2>Lista de Pendientes</h2>
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Añadir Pendiente</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {editTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTodoText}
                  onChange={e => setEditTodoText(e.target.value)}
                />
                <button onClick={updateTodo}>Guardar Cambios</button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <button onClick={() => startEditTodo(todo.id, todo.text)}>Editar</button>
              </>
            )}
            <button onClick={() => deleteTodo(todo.id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
