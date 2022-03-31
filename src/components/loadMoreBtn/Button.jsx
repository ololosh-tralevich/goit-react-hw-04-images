import {memo} from 'react'

import PropTypes from 'prop-types';

import styles from './button.module.css';

const Button = ({ loadMore }) => {
  return (
    <footer>
      <button className={styles.button} onClick={loadMore}>
        Load More
      </button>
    </footer>
  );
};

export default memo(Button);

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
