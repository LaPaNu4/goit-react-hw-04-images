import React, { useState } from 'react';
import { SearchBarHeader } from './SearchBar.styled';
import PropTypes from 'prop-types';

export const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(inputValue);
  };

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <SearchBarHeader>
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="button-label">🔍</span>
          </button>

          <input
            value={inputValue}
            onChange={handleChange}
            id="searchInput"
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </SearchBarHeader>
    </>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
