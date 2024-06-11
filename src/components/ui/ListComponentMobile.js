import React from 'react';
import '../styles/TodoList.css';
import NoData from '../common/NoData';
import Button from '../common/button/Button';

const ListComponentMobile = ({ activeTodos, updateTodo }) => {
    return (
        <div className="mobile-table-container">
            {activeTodos.length === 0 ? (
                <div className="mobile-table-row">
                    <div className="mobile-table-cell" role="cell" colSpan="6">
                        <NoData />
                    </div>
                </div>
            ) : (
                activeTodos.map(todo => (
                    <div key={todo.id} className="card-container" role="row">
                        <div className="mobile-table-row">
                            <div className="mobile-table-label" role="columnheader">Title:</div>
                            <div className="table-cell" role="cell">
                                <div className="data-container">
                                    {todo.todo}
                                </div>
                            </div>
                        </div>
                        <div className="mobile-table-row">
                            <div className="mobile-table-label" role="columnheader">Description:</div>
                            <div className="table-cell mobile-description" role="cell">{todo.description}</div>
                        </div>
                        <div className="mobile-table-row">
                            <div className="mobile-table-label" role="columnheader">Priority:</div>
                            <div className={`priority-capsule ${todo.priority.title}`} role="cell">
                                {todo.priority.title}
                            </div>
                        </div>
                        <div className="mobile-table-row">
                            <div className="mobile-table-label" role="columnheader">Due Date:</div>
                            <div role="cell">{todo.dueDate.toLocaleDateString()}</div>
                        </div>
                        <div className="mobile-table-row">
                            <div className="mobile-table-label" role="columnheader">Status:</div>
                            <div role="cell">{todo.isCompleted ? 'Completed' : 'Pending'}</div>
                        </div>
                        <div className="mobile-table-row edit">
                            <Button
                                className="mobile-edit-button"
                                handleClick={() => updateTodo(todo)}
                                aria-label={`Edit task ${todo.title}`}
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ListComponentMobile;
