import {memo} from 'react'

import PropTypes from 'prop-types';

import styles from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ alt, smallImg, openModal, modalPhoto }) => {
  return (
    <li
      className={styles.galleryListItem}
      onClick={() => openModal(modalPhoto)}
    >
      <img
        className={styles.galleryListItemImg}
        src={smallImg}
        alt={alt}
        loading="lazy"
      ></img>
    </li>
  );
};

export default memo(ImageGalleryItem);

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  alt: PropTypes.string,
  modalPhoto: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
