import { useState, useEffect, useRef } from 'react';

import Searchbar from './searchbar/Searchbar';
import { fetchPhotos } from './fetchPhotos/fetchPhotos';
import ImageGallery from './imageGallery/ImageGallery';
import Loader from './loader/Loader';
import Button from './loadMoreBtn/Button';
import Modal from './photoModal/Modal';

import styles from './photoModal/modal.module.css';

function ImageFinder() {
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [searchWord, setSearchWord] = useState('');

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      return (firstRender.current = false);
    }
    fetchPhoto();
  }, [searchWord, page]);

  async function fetchPhoto() {
    setLoading(true);
    if (page === 1) {
      setPhotos([]);
    }
    try {
      const data = await fetchPhotos(searchWord, page);
      setPhotos(prevState => {
        return [...prevState, ...data.hits];
      });
      setTotalData(data.totalHits);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  const searchPhotos = keyWord => {
    setPage(1);
    setSearchWord(keyWord);
  };

  const loadMore = () => {
    setPage(prevState => {
      return prevState + 1;
    });
  };

  const openModal = modalPhoto => {
    setModalOpen(true);
    setModalContent(modalPhoto);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent('');
  };

  return (
    <>
      <Searchbar onSubmit={searchPhotos} />
      <ImageGallery photoArr={photos} openModal={openModal} />
      {loading && <Loader />}
      {modalOpen && (
        <Modal modalContent={modalContent} closeModal={closeModal}>
          <img
            className={styles.modalImg}
            src={modalContent}
            alt="Big"
            loading="lazy"
          />
        </Modal>
      )}
      {totalData > 12 && photos.length !== totalData ? (
        <Button loadMore={loadMore} />
      ) : (
        <></>
      )}
    </>
  );
}

export default ImageFinder;
