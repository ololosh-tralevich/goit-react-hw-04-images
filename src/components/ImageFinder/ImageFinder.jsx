import { useState, useEffect, useRef } from 'react';

import Searchbar from './searchbar/Searchbar';
import { fetchPhotos } from './fetchPhotos/fetchPhotos';
import ImageGallery from './imageGallery/ImageGallery';
import Loader from './loader/Loader';
import Button from './loadMoreBtn/Button';
import Modal from './photoModal/Modal';

import styles from './photoModal/modal.module.css';

// const timeState = {
//   page: 1,
//   photos: [],
//   totalData: 0,
//   loading: false,
//   errMessage: null,
//   modalOpen: false,
//   modalContent: '',
// };

function ImageFinder() {
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [searchWord, setSearchWord] = useState('');

  const firstRender = useRef(true);
  // useEffect(() => {
  // //   const { searchWord, page } = state;
  //   if (searchWord !== prevsearchWord || page !== prevpage) {
  //     setLoading(true);
  //     fetchPhoto();
  //   }
  // }, []);

  useEffect(() => {
    //   if (searchWord !== prevsearchWord || page !== prevpage) {
    // }
    if (firstRender.current) {
      return (firstRender.current = false);
    }
    fetchPhoto();
  }, [searchWord, page]);

  async function fetchPhoto() {
    setLoading(true);
    try {
      const data = await fetchPhotos(searchWord, page);
      //   setState(prevState => {
      //     return {
      //       photos: [...prevphotos, ...data.hits],
      //       totalData: data.totalHits,
      //       loading: false,
      //     };
      //   });
      setPhotos(prevState => {
        return [...prevState, ...data.hits];
      });
      setTotalData(data.total.hits);
      setLoading(false);
    } catch (err) {
      console.log(err);
      //   setState({ loading: false, errMessage: err });
      setLoading(false);
      setErrMessage(err);
    }
  }

  const searchPhotos = searchWord => {
    // setState(prevState => {
    //   return searchWord !== prevsearchWord && { searchWord, photos: [] };
    // });
    // console.log(setSearchWord(prevState => {}))
    setSearchWord(prevState => {
      return searchWord !== prevState && { searchWord }, setPhotos([]);
    });
  };

  const loadMore = () => {
    setPage(prevState => {
      return { page: prevState + 1 };
    });
  };

  const openModal = modalPhoto => {
    setModalOpen({ modalOpen: true });
    setModalContent({ modalContent: modalPhoto });
  };

  const closeModal = () => {
    setModalOpen({ modalOpen: false });
    setModalContent({ modalContent: '' });
  };

  return (
    <>
      <Searchbar
        onSubmit={searchPhotos}
        //    typeSearchWord={this.typeSearchWord}
      />
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

      {totalData > 12 ? <Button loadMore={loadMore} /> : <></>}
    </>
  );
}

export default ImageFinder;
