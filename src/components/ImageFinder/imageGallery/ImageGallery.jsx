import { nanoid } from 'nanoid';

import PropTypes from 'prop-types';

import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
import styles from './imageGallery.module.css';

const ImageGallery = ({ photoArr, openModal }) => {
  if (!photoArr.length) {
    return <></>;
  }
  const elements = photoArr.map(photo => (
    <ImageGalleryItem
      key={nanoid()}
      openModal={openModal}
      smallImg={photo.webformatURL}
      modalPhoto={photo.largeImageURL}
      alt={photo.tags}
    />
  ));

  return <ul className={styles.galleryList}>{elements}</ul>;
};

export default ImageGallery;

ImageGallery.propTypes = {
  photoArr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      alt: PropTypes.string,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};
