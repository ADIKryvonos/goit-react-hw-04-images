import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { getPictures } from '../services/GetPictures';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    inputValue: '',
    pictures: [],
    page: 1,
    per_page: 12,
    status: 'idle',
    showBtn: false,
    largeImageURL: '',
    tags: '',
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    const prevValue = prevState.inputValue;
    const nextValue = this.state.inputValue;
    const { page } = this.state;

    if (prevValue !== nextValue || prevState.page !== page) {
      this.setState({ status: 'pending' });
      getPictures(nextValue, page, this.state.per_page)
        .then(response => {
          return response.json();
        })

        .then(resp => {
          const { totalHits, hits } = resp;
          if (hits.length === 0) {
            toast.error(`Opps, nothing found "${nextValue}"`);
          }
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...hits],
            status: 'resolved',
            showBtn:
              prevState.page < Math.ceil(totalHits / this.state.per_page),
          }));
        })

        .catch(error =>
          this.setState({
            error: error,
            status: 'rejected',
          })
        );
    }
  }

  formSubmit = inputValue => {
    this.setState({
      inputValue: inputValue,
      pictures: [],
      page: 1,
      status: 'idle',
      largeImageURL: '',
      tags: '',
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  openBigPicture = (largeImageURL, tags) => {
    this.modalChange();
    this.setState({
      largeImageURL: largeImageURL,
      tags: tags,
    });
  };

  modalChange = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { pictures, status, showBtn, showModal, largeImageURL, tags } =
      this.state;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
          }}
        />
        <SearchBar onSubmit={this.formSubmit} />
        <ImageGallery pictures={pictures} onClick={this.openBigPicture} />

        {showModal && (
          <Modal src={largeImageURL} alt={tags} onClose={this.modalChange} />
        )}
        {showBtn && <Button onClick={this.loadMore} />}

        {status === 'pending' && <Loader />}
        {status === 'rejected' && (
          <p style={{ textAlign: 'center' }}>
            Sorry. There are some problems, try again.
          </p>
        )}
      </div>
    );
  }
}
