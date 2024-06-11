import React from 'react';
import '../styles/TodoList.css';
import NoData from '../common/NoData';

const ListComponent = ({ activeTodos, updateTodo }) => {
    return (
        <div className="table-container">
            <div className="table-header">
                <div className="table-row borderBottom">
                    <div className="table-cell todo">Title</div>
                    <div className="table-cell todo">Description</div>
                    <div className="table-cell">Priority</div>
                    <div className="table-cell">Due Date</div>
                    <div className="table-cell">Status</div>
                    <div className="table-cell">Action</div>
                </div>
            </div>
            <div className="table-body">
                {activeTodos.length === 0 ? (
                    <div className="table-row">
                        <div className="table-cell" colSpan="6">
                            <NoData className="no-data" />
                        </div>
                    </div>
                ) : (
                    activeTodos.map(todo => (
                        <React.Fragment key={todo.id}>
                            <div className="table-row">
                                <div className="table-cell todo">
                                    <div className="data-container">
                                        <div className="icon" role="img" aria-label="Task Icon"></div>
                                        <span>{todo.todo}</span>
                                    </div>
                                </div>
                                <div className="table-cell todo">
                                    <div className="data-container">
                                        <span>{todo.description}</span>
                                    </div>
                                </div>
                                <div className="table-cell">
                                    <div className={`priority-capsule ${todo.priority.title}`}>
                                        {todo.priority.title}
                                    </div>
                                </div>
                                <div className="table-cell">{todo.dueDate.toLocaleDateString()}</div>
                                <div className="table-cell">{todo.isCompleted ? 'Completed' : 'Pending'}</div>
                                <div className="table-cell">
                                    <button 
                                        className="edit" 
                                        onClick={() => updateTodo(todo)}
                                        aria-label="Edit task"
                                    >
                                        Edit <img src={process.env.PUBLIC_URL + '/images/edit.svg'} alt="Edit" />
                                    </button>
                                </div>
                            </div>
                        </React.Fragment>
                    ))
                )}
            </div>
        </div>    
    );
};

export default ListComponent;
