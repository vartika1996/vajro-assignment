import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './components/ui/TodoList';
import './App.css';
import { TodoProvider } from './components/ui/TodoContext';

function App() {
  return (
    <TodoProvider>
      <Router>
        <div className="container">
          <Routes>
          <Route path="/" element={<TodoList/>} />
          </Routes>
        </div>
      </Router>
    </TodoProvider>
  );
}

export default App;
