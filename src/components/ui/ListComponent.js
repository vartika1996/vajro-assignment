import React from 'react';
import '../styles/TodoList.css';
import NoData from '../common/NoData';

const ListComponent = ({ activeTodos, updateTodo, highlightedText }) => {

    const getTextWithHighlights = (text) => {
        const regex = new RegExp(`(${highlightedText})`, 'gi');
        const textArray = text.split(regex);
        return textArray.map((word)  => {
            if(word === highlightedText) {
                return <span className='highlight'>{word}</span>;
            } return word;
        })
    }

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
                                        <span>{getTextWithHighlights(todo.todo)}</span>
                                    </div>
                                </div>
                                <div className="table-cell todo">
                                    <div className="data-container">
                                        <span >{getTextWithHighlights(todo.description)}</span>
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
