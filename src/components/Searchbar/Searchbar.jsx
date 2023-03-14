import { BiSearch } from 'react-icons/bi';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormLabel,
  SearchFormInput,
} from './Searchbar.styled';

export function SearchBar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const inputValueChange = e => {
    setInputValue(e.currentTarget.value.trim().toLowerCase());
  };

  const formSubmit = e => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={formSubmit}>
        <SearchFormButton type="submit">
          <BiSearch />
          <SearchFormLabel>Search</SearchFormLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          value={inputValue}
          onChange={inputValueChange}
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Searchbar>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
