import { useEffect, useState } from 'react';
import '../styles/Chip.css';
import Popover from '../common/popover/Popover';
import FilterComponent from './TodoFilter';
import { sortByOptions } from '../utils';

const SortFilterChip = ({setSelectedSort, setIsPopoverOpen}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedId, setSelectedId] = useState('');

    useEffect(() => {
        setIsPopoverOpen(isFilterOpen || isSortOpen)
    },[isFilterOpen, isSortOpen, setIsPopoverOpen])

    const handleSortClick = (option) => {
        setSelectedSort(option);
        setSelectedId(option.id);
        setTimeout(() => {
            setIsSortOpen(false);

        }, 500)
    }

    return (
        <>
            <div class="chipContainer">
                <div class="filterChip" role="button" tabindex="0" onClick={() => setIsFilterOpen(true)}>
                    <span class="heading">Filters</span>
                </div>
                <div class="sortChip" role="button" tabindex="0" onClick={() => setIsSortOpen(true)}>
                    <span class="heading">Sort</span>
                </div>
            </div>
            <Popover isOpen={isFilterOpen} defaultHeight={500} >
                <div className='popover-heading'>
                    <h2>Filters</h2>
                    <button className="close-btn" onClick={() => setIsFilterOpen(false)}>Close</button>
                </div>
                <FilterComponent className="filter" />
            </Popover>
            <Popover isOpen={isSortOpen} defaultHeight={500} >
                <div className='popover-heading'>
                    <h2>Sort By</h2>
                    <button className='close-btn' onClick={() => setIsSortOpen(false)}>Close</button>
                </div>
                <div className='sort-container'>
                    {sortByOptions.map((option) => {
                        return(
                            <button className={`sort-option ${selectedId &&  selectedId === option.id ? 'highlight' : ''}`} onClick={() => handleSortClick(option)}>
                                {option.title}
                            </button>
                        )
                    })}
                </div>
            </Popover>
        </>
    )
}

export default SortFilterChip;