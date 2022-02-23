import { Component } from 'react';

import Searchbar from './searchbar/Searchbar';
import { fetchPhotos } from './fetchPhotos/fetchPhotos';
import ImageGallery from './imageGallery/ImageGallery';
import Loader from './loader/Loader';
import Button from './loadMoreBtn/Button';
import Modal from './photoModal/Modal';

import styles from './photoModal/modal.module.css';

export class App extends Component {
  state = {
    page: 1,
    photos: [],
    totalData: 0,
    loading: false,
    errMessage: null,
    modalOpen: false,
    modalContent: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchWord, page } = this.state;
    if (searchWord !== prevState.searchWord || page !== prevState.page) {
      this.setState({
        loading: true,
      });
      this.fetchPhotos();
    }
  }

  async fetchPhotos() {
    const { searchWord, page } = this.state;
    try {
      const data = await fetchPhotos(searchWord, page);
      this.setState(prevState => {
        return {
          photos: [...prevState.photos, ...data.hits],
          totalData: data.totalHits,
          loading: false,
        };
      });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false, errMessage: err });
    }
  }

  searchPhotos = ({ searchWord }) => {
    this.setState(prevState => {
      return searchWord !== prevState.searchWord && { searchWord, photos: [] };
    });
  };

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  openModal = modalPhoto => {
    this.setState({ modalOpen: true, modalContent: modalPhoto });
  };

  closeModal = () => {
    this.setState({ modalOpen: false, modalContent: '' });
  };

  render() {
    return (
      <>
        <Searchbar
          onSubmit={this.searchPhotos}
          typeSearchWord={this.typeSearchWord}
        />
        <ImageGallery photoArr={this.state.photos} openModal={this.openModal} />
        {this.state.loading && <Loader />}
        {this.state.modalOpen && (
          <Modal
            modalContent={this.state.modalContent}
            closeModal={this.closeModal}
          >
            <img
              className={styles.modalImg}
              src={this.state.modalContent}
              alt="Big"
              loading="lazy"
            />
          </Modal>
        )}

        {this.state.totalData > 12 ? (
          <Button loadMore={this.loadMore} />
        ) : (
          <></>
        )}
      </>
    );
  }
}
