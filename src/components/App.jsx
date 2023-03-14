import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { getPictures } from '../services/GetPictures';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export function App() {
  const [inputValue, setInputValue] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [per_page, setPer_page] = useState(12);
  const [status, setStatus] = useState('idle');
  const [showBtn, setShowBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setlargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (inputValue === '') {
      return;
    }
    setStatus('pending');
    const fetch = async () => {
      try {
        const { hits, totalHits } = await getPictures(
          inputValue,
          page,
          per_page
        );

        if (hits.length === 0) {
          toast.error(`Opps, nothing found "${inputValue}"`);
        }
        setPictures(prevPictures => [...prevPictures, ...hits]);
        setStatus('resolved');
        setShowBtn(page < Math.ceil(totalHits / per_page));
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
    };
    fetch();
  }, [inputValue, page, per_page]);

  const formSubmit = inputValue => {
    setInputValue(inputValue);
    setPictures([]);
    setPage(1);
    setStatus('idle');
    setError(null);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openBigPicture = (largeImageURL, tags) => {
    modalChange();
    setlargeImageURL(largeImageURL);
    setTags(tags);
  };

  const modalChange = () => {
    setShowModal(!showModal);
  };

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
      <SearchBar onSubmit={formSubmit} />
      <ImageGallery pictures={pictures} onClick={openBigPicture} />

      {showModal && (
        <Modal src={largeImageURL} alt={tags} onClose={modalChange} />
      )}
      {showBtn && <Button onClick={loadMore} />}

      {status === 'pending' && <Loader />}
      {status === 'rejected' && (
        <p style={{ textAlign: 'center' }}>
          Sorry. There are some problems, try again.
        </p>
      )}
    </div>
  );
}
