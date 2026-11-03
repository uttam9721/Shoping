import React from 'react';
import { useLocation } from 'react-router-dom';
import '../index.css';

const FilterDropdown = ({ products, setFilteredData, filterbyCategory }) => {
  const location = useLocation();

  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === "all") {
      setFilteredData(products); // No filter
    } else {
      filterbyCategory(selectedCategory); // Filter by selected category
    }
  };

  return (
    <>
      {location.pathname === "/" && (
        <div className="filter-dropdown">
          <select onChange={handleChange} defaultValue="all">
            <option value="all">All Products</option>
            <option value="mobiles">Mobiles</option>
            <option value="laptop">Laptop</option>
            <option value="cameras">Cameras</option>
            <option value="headphones">Headphones</option>
          </select>
        </div>
      )}
    </>
  );
};

export default FilterDropdown;