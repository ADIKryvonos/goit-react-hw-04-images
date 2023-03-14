import { BiSearch } from 'react-icons/bi';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class SearchBar extends Component {
  state = {
    inputValue: '',
  };

  inputValueChange = e => {
    this.setState({ inputValue: e.currentTarget.value.trim().toLowerCase() });
  };

  formSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <Searchbar>
        <SearchForm onSubmit={this.formSubmit}>
          <SearchFormButton type="submit">
            <BiSearch />
            <SearchFormLabel>Search</SearchFormLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            value={inputValue}
            onChange={this.inputValueChange}
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Searchbar>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
