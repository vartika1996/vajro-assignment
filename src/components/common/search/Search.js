import React, { useState } from 'react';
import './Search.css';
import Button from '../button/Button';

const SearchComponent = ({ todoData, setSearchResults, className, buttonClassName, inputClassName, placeholder, setHighlightedText}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if(searchTerm === '' || searchTerm.trim() === '') {
        setSearchResults(todoData);
        setSearchTerm('');
    } else {
        const results = todoData.filter(todo => {
            const titleMatch = todo.todo.toLowerCase().includes(searchTerm.toLowerCase());
            const descriptionMatch = todo.description.toLowerCase().includes(searchTerm.toLowerCase());
            return titleMatch || descriptionMatch;
        });
        setSearchResults(results);
        setHighlightedText(searchTerm);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults(todoData); // Optionally clear search results to show all items
    setHighlightedText('');
  };

  return (
    <div className={className}>
        <div className='input-wrapper'>
            <input
            id="search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder || "Search..."}
            className={inputClassName}
            aria-label="Search"
            />
            {searchTerm && (
            <button
                className="clear-button"
                onClick={clearSearch}
                aria-label="Clear search"
            >
                &times;
            </button>
            )}
        </div>
        <Button
            handleClick={handleSearch}
            className={buttonClassName}
            aria-label="Search"
        >
            Search
        </Button>
    </div>
  );
};

export default SearchComponent;
