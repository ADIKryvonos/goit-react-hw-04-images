import React from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

export const Picture = ({ webformatURL, tags, onClick }) => {
  return (
    <GalleryItem>
      <GalleryImg src={webformatURL} alt={tags} onClick={onClick} />
    </GalleryItem>
  );
};

Picture.propTypes = {
  onClick: PropTypes.func,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
