import React, { createContext, useContext, useState, useEffect } from 'react';
import { todoData } from '../data';
import { getSortedTodoData } from '../utils';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [activeTodos, setActiveTodos] = useState([]);
  const todosActive = todoData.filter((todo) => todo.isActive === true);
  const [selectedFilters, setSelectedFilters] = useState({
    PRIORITY: [],
    DUEDATE: [],
    STATUS: []
  });

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
        storedTodos.forEach(todo => {
            todo.dueDate = new Date(todo.dueDate);
          });
        setTodos(storedTodos);
        setActiveTodos(storedTodos);
    } else {
        const allTodos = getSortedTodoData('priority', todosActive);
        setTodos(allTodos);
        setActiveTodos(allTodos);
        localStorage.setItem('todos', JSON.stringify(allTodos));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <TodoContext.Provider value={{ todos, activeTodos, setActiveTodos, selectedFilters, setSelectedFilters, setTodos}}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
