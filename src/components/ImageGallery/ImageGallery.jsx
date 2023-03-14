import React from 'react';
import PropTypes from 'prop-types';

import { ImageList } from './ImageGallery.styled';

import { Picture } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ pictures, onClick }) => {
  return (
    <ImageList>
      {pictures.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <Picture
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            onClick={() => {
              onClick(largeImageURL, tags);
            }}
          />
        );
      })}
    </ImageList>
  );
};

ImageGallery.propTypes = {
  onClick: PropTypes.func,

  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
