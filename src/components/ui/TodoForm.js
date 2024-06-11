import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useTodoContext } from './TodoContext';
import '../styles/TodoForm.css';
import { getSortedTodoData, priority } from '../utils';
import Dropdown from '../common/dropdown/Dropdown';
import Button from '../common/button/Button';

const priorityOptions = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' }
];

const TodoForm = ({ isSidebarOpen, closeSidebar, editTodo }) => {
	const { todos: activeTodos, setActiveTodos, setTodos } = useTodoContext();
  const [error, setError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
	const [formData, setFormData] = useState({
		id: editTodo ? editTodo.id : Date.now(),
		todo: editTodo ? editTodo.todo : '',
		description: editTodo ? editTodo.description : '',
		priority: editTodo && typeof editTodo.priority.title === 'string' ? priority[editTodo.priority.title.toUpperCase()] : priority['HIGH'],
		dueDate: editTodo ? new Date(editTodo.dueDate) : new Date(),
		isCompleted: editTodo ? editTodo.isCompleted : false,
		isActive: editTodo ? editTodo.isActive : true,
	});

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [closeSidebar]);

  useEffect(() => {
    setFormData(prevState => ({
      ...prevState,
      id: editTodo ? editTodo.id : Date.now(),
      todo: editTodo ? editTodo.todo : '',
      description: editTodo ? editTodo.description : '',
      priority: editTodo && typeof editTodo.priority.title === 'string' ? priority[editTodo.priority.title.toUpperCase()] : priority['HIGH'],
      dueDate: editTodo ? new Date(editTodo.dueDate) : new Date(),
      isCompleted: editTodo ? editTodo.isCompleted : false,
    }));
  }, [editTodo]);

  const updateTodosAndLocalStorage = (updatedTodos) => {
    setActiveTodos(updatedTodos);
    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "priority") {
      const priorityObj = priority[value.toUpperCase()];
      setFormData(prevState => ({
        ...prevState,
        priority: priorityObj
      }));
    } else {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
  };

  const handleDateChange = (date) => {
    setFormData(prevState => ({
      ...prevState,
      dueDate: date
    }));
  };

  const validateForm = () => {
    let titleError = '';
    let descriptionError = '';
    if (typeof formData.todo !== 'string' || formData.todo.trim() === '') {
      titleError = 'Title must be a non-empty string.';
    }
    if (typeof formData.description !== 'string' || formData.description.trim() === '') {
      descriptionError = 'Description must be a non-empty string.';
    }
    setError(titleError);
    setDescriptionError(descriptionError); 
    if (titleError || descriptionError) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (editTodo) {
        const updatedTodos = activeTodos.map(todo => {
          if (todo.id === editTodo.id) {
            return formData;
          }
          return todo;
        });
        const sortedTodos = getSortedTodoData('priority', updatedTodos);
        updateTodosAndLocalStorage(sortedTodos);
      } else {
        const sortedTodos = getSortedTodoData('priority', [...activeTodos, formData]);
        updateTodosAndLocalStorage(sortedTodos);
      }
      closeSidebar();
    }
  };

  const handleMarkAsComplete = () => {
    const updatedTodos = activeTodos.map(todo => {
        if (todo.id === formData.id) {
            return { ...todo, isCompleted: true };
        }
        return todo;
    });
    updateTodosAndLocalStorage(updatedTodos);
    closeSidebar();
};

const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this todo?');
    if (confirmDelete) {
        // Filter out the deleted todo from activeTodos
        const updatedTodos = activeTodos.filter(todo => todo.id !== formData.id);
        updateTodosAndLocalStorage(updatedTodos);
        closeSidebar();
    }
};

  const handleCancel = () => {
    closeSidebar();
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} ref={sidebarRef} aria-hidden={!isSidebarOpen}>
      <div className="sidebar-content">
        <h2>{editTodo ? 'Edit Task' : 'Add Task'}</h2>
        <form className='form'>
          <label htmlFor="todo">Title:</label>
          <input 
            type="text" 
            id="todo"
            name="todo" 
            value={formData.todo} 
            onChange={handleInputChange} 
            className='input todo-input'
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'title-error' : null}
          />
          {error && <span id="title-error" className='error'>{error}</span>}
          <label htmlFor="description">Description:</label>
          <input 
            type="text" 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleInputChange} 
            className='input todo-input'
            aria-invalid={descriptionError ? 'true' : 'false'}
            aria-describedby={descriptionError ? 'description-error' : null}
          />
          {descriptionError && <span id="description-error" className='error'>{descriptionError}</span>}
          <label htmlFor="priority">Priority:</label>
          <Dropdown
            options={priorityOptions} 
            onChange={(e) => handleInputChange({ target: { name: 'priority', value: e.target.value } })} 
            className='input'
            value={formData.priority.title}
            aria-label="Select priority"
          />
          <label htmlFor="dueDate">Due Date:</label>
          <DatePicker 
            id="dueDate" 
            name="dueDate" 
            selected={formData.dueDate} 
            minDate={new Date()} 
            onChange={handleDateChange} 
            className='input'
            aria-label="Select due date"
          />
          <div className="form-buttons">
            <Button className='secondary-button' handleClick={() => handleCancel()}>
                Cancel
            </Button>
            <Button handleClick={(e) => handleSubmit(e)}>
                {editTodo ? 'Update' : 'Add'}
            </Button>
          </div>
          <hr className="row-divider" />
          {editTodo && !editTodo.isCompleted ?
            <>
              <div className="form-buttons">
                <h4>Mark this Task as Complete</h4>
                <Button handleClick={() => handleMarkAsComplete()}>
                  Mark as Complete
                </Button>
              </div>
              <hr className="row-divider" />
            </> : null
          }
          {editTodo && editTodo.isActive ?
            <div className="form-buttons">
                <h4>Do you want to delete this todo?</h4>
                <Button handleClick={() => handleDelete()}>
                    Delete
                </Button>
            </div> : null
          }
        </form>
      </div>
    </div>
  );
};

export default TodoForm;