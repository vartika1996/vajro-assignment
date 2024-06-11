import { useCallback } from 'react';
import './SortComp.css';

const SortComponent = ({ sortBy, selectedSort, setSelectedSort }) => {

    const handleSort = useCallback((e) => {
        const sortOption = JSON.parse(e.target.value);
        setSelectedSort(sortOption);
    }, [setSelectedSort]);

    return (
        <div>
            <label htmlFor="sort-select" className="sr-only">Sort By</label>
            <select
                id="sort-select"
                onChange={handleSort}
                className="sortContainer"
                aria-label="Sort tasks"
                value={selectedSort ? JSON.stringify(selectedSort) : ''}
            >
                {sortBy.map((sortOption, index) => (
                <option key={index} value={JSON.stringify(sortOption)}>
                    {sortOption.title}
                </option>
                ))}
            </select>
        </div>
    );
};

export default SortComponent;
