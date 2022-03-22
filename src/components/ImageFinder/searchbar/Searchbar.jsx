import { useState } from 'react';

import PropTypes from 'prop-types';

import styles from './searchbar.module.css';

import searchIcon from '../img/searchIcon.svg';

const Searchbar = ({ onSubmit }) => {
  const [keyWord, setSearchWord] = useState('');

  const handleSubmit = ev => {
    ev.preventDefault();
    onSubmit(keyWord);
  };

  const handleChange = ev => {
    setSearchWord(ev.target.value);
  };

  return (
    <header>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images..."
          onChange={handleChange}
        />
        <button className={styles.submitButton} type="submit">
          <img
            className={styles.searchIcon}
            src={searchIcon}
            width="15px"
            alt="Search Icon"
          />
        </button>
      </form>
    </header>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}