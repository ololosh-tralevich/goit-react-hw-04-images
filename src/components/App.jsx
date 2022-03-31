import { useState, useEffect, useRef, useCallback } from 'react';

import Searchbar from './searchbar/Searchbar';
import { fetchPhotos } from './fetchPhotos/fetchPhotos';
import ImageGallery from './imageGallery/ImageGallery';
import Loader from './loader/Loader';
import Button from './loadMoreBtn/Button';
import Modal from './photoModal/Modal';

import styles from './photoModal/modal.module.css';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [imageData, setImageData] = useState({
    page: 1,
    photos: [],
    totalData: 0,
  });
  const [modal, setModal] = useState({
    modalOpen: false,
    modalContent: '',
  });

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      return (firstRender.current = false);
    }
    fetchPhoto();
    // eslint-disable-next-line
  }, [searchWord, imageData.page]);

  async function fetchPhoto() {
    setLoading(true);
    if (imageData.page === 1) {
      setImageData(prevState => {
        return {
          ...prevState,
          photos: [],
        };
      });
    }
    try {
      const data = await fetchPhotos(searchWord, imageData.page);
      setImageData(prevState => {
        return {
          ...prevState,
          photos: [...prevState.photos, ...data.hits],
          totalData: data.totalHits,
        };
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  const searchPhotos = useCallback(keyWord => {
    setImageData(prevState => {
      return {
        ...prevState,
        page: 1,
      };
    });
    setSearchWord(keyWord);
  }, []);

  const loadMore = useCallback(() => {
    setImageData(prevState => {
      console.log(prevState);
      return { ...prevState, page: prevState.page + 1 };
    });
  }, []);

  const openModal = useCallback(modalPhoto => {
    setModal({
      modalOpen: true,
      modalContent: modalPhoto,
    });
  }, []);

  const closeModal = () => {
    setModal({
      modalOpen: false,
      modalContent: '',
    });
  };

  return (
    <>
      <Searchbar onSubmit={searchPhotos} />
      <ImageGallery photoArr={imageData.photos} openModal={openModal} />
      {loading && <Loader />}
      {modal.modalOpen && (
        <Modal modalContent={modal.modalContent} closeModal={closeModal}>
          <img
            className={styles.modalImg}
            src={modal.modalContent}
            alt="Big"
            loading="lazy"
          />
        </Modal>
      )}
      {imageData.totalData > 12 &&
      imageData.photos.length !== imageData.totalData ? (
        <Button loadMore={loadMore} />
      ) : (
        <></>
      )}
    </>
  );
};
