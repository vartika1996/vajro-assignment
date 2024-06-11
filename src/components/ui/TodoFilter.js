import { filters, getFilteredData } from "../utils";
import { useTodoContext } from "./TodoContext";

import '../styles/Filters.css';
import { useCallback, useEffect } from "react";

const FilterComponent = ({className}) => {
  const {selectedFilters, setSelectedFilters, todos, setActiveTodos} = useTodoContext();

  const handleCheckboxChange = useCallback((domain, value) => {
    setSelectedFilters(prevFilters => {
      const updatedDomain = prevFilters[domain].includes(value)
        ? prevFilters[domain].filter(item => item !== value)
        : [...prevFilters[domain], value];

      return { ...prevFilters, [domain]: updatedDomain };
    });

  }, [setSelectedFilters]);

  useEffect(() => {
    const filteredData = getFilteredData(selectedFilters, todos);
    setActiveTodos(filteredData)
  }, [selectedFilters]);

  const renderCheckboxGroup = (key, title, values) => (
    <div className="filter-group" key={key}>
      <h3>{title}</h3>
      {values.map(value => (
        <div key={value} className="filter-option">
          <input
            type="checkbox"
            id={`${key}-${value}`}
            name={value}
            value={filters[value].group}
            checked={selectedFilters[key]?.includes(filters[value].group)}
            onChange={() => handleCheckboxChange(key, filters[value].group)}
          />
          <label htmlFor={`${key}-${value}`}>{filters[value].title}</label>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`filter-component ${className}`}>
      {Object.keys(filters).map(key => {
        if (filters[key].group === "") {
          return (
            <fieldset key={key} className="priority">
              {renderCheckboxGroup(key, filters[key].title, filters[key].filterValue)}
            </fieldset>
          );
        }
        return null;
      })}
    </div>
  );
};

export default FilterComponent;
