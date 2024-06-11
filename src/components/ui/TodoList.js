import React, { useCallback, useEffect, useState } from 'react';
import { useTodoContext } from './TodoContext';
import TodoForm from './TodoForm';
import '../styles/TodoList.css';
import Button from '../common/button/Button';
import FilterComponent from './TodoFilter';
import SearchComponent from '../common/search/Search';
import SortComponent from '../common/sortComponent/SortComp';
import { sortByOptions } from '../utils';
import SortFilterChip from './SortFilterChip';
import useMediaQuery from '../hooks/useMediaQuery';
import ListComponent from './ListComponent';
import ListComponentMobile from './ListComponentMobile';

const TodoList = () => {
    const { activeTodos, setActiveTodos, todos: searchData, setSelectedFilters } = useTodoContext();
    const [ showSidebar, setShowSidebar ] = useState(false);
    const [todo, setTodo] = useState();
    const [selectedSort, setSelectedSort] = useState('');
    const [isPopoverOpen, setIsPopoverOpen] = useState('');
    const {isTablet} = useMediaQuery()

    const updateTodo = (todo) => {
        if(todo) {
            setTodo(todo);
        } else {
            setTodo();
        }
        setShowSidebar(true);
        setSelectedFilters({
            PRIORITY: [],
            DUEDATE: [],
            STATUS: []
        });
        setSelectedSort('');
    }

    const handleSort = useCallback((sortOption) => {
        const sortedData = [...activeTodos];

        if (sortOption.value === 'asc') {
            sortedData.sort((a, b) => {
              if (sortOption.key === 'priority') {
                return a.priority.value - b.priority.value;
              } else if (sortOption.key === 'dueDate') {
                return new Date(a.dueDate) - new Date(b.dueDate);
              } else {
                return 0;
              }
            });
          } else if (sortOption.value === 'desc') {
            sortedData.sort((a, b) => {
              if (sortOption.key === 'priority') {
                return b.priority.value - a.priority.value;
              } else if (sortOption.key === 'dueDate') {
                return new Date(b.dueDate) - new Date(a.dueDate);
              } else {
                return 0;
              }
            });
          }

        setActiveTodos(sortedData);
        setSelectedSort(sortOption);
    }, [activeTodos, setActiveTodos]);

    useEffect(() => {
        if (selectedSort) {
            handleSort(selectedSort);
        }
    }, [selectedSort, handleSort]);

    return (
        <>
            <div className={`main-container ${showSidebar ? 'sidebar-open' : ''}`}>
                <h1> Task Manager</h1>
                <div className={`listPageContainer ${showSidebar || isPopoverOpen ? 'sidebar-open' : ''}`}>
                    {!isTablet ? <FilterComponent className='filterContainer' /> : null}
                    <div className='fullWidth'>
                        <div className='searchContainer'>
                            <SearchComponent
                                todoData={searchData}
                                setSearchResults={(result) => setActiveTodos(result)}
                                className='searchBar'
                                buttonClassName='searchButton'
                                inputClassName='searchInput'
                                placeholder="Search by Title or Description"
                            />
                            {!isTablet ? (
                                <SortComponent
                                    sortBy={sortByOptions}
                                    selectedSort={selectedSort}
                                    setSelectedSort={setSelectedSort}
                                />
                            ) : null }
                        </div>
                        <div className="listContainer">
                            <div className="header">
                                <h2>All Tasks</h2>
                                <Button handleClick={() => updateTodo()}>
                                    Add Task
                                </Button>
                            </div>
                            {isTablet ? (
                                <ListComponentMobile activeTodos={activeTodos} updateTodo={updateTodo} />
                            ) : <ListComponent activeTodos={activeTodos} updateTodo={updateTodo} />
                            }
                        </div>      
                    </div>
                </div>
                {isTablet ? <SortFilterChip setSelectedSort={setSelectedSort} setIsPopoverOpen={setIsPopoverOpen} /> : null}
            </div>
            <div>
                {showSidebar ? <TodoForm isSidebarOpen={showSidebar} editTodo={todo} closeSidebar={() => setShowSidebar(false)} /> : null}
            </div>        </>
    );
};

export default TodoList;
