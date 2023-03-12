import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import { ImageGalleryItemImage } from '../ImageGalleryItem/ImageGalleryItem.syled';

export function Image({ img }) {
  const [isOpen, setUseOpen] = useState();

  const openModal = () => setUseOpen(true);

  const closeModal = () => setUseOpen(false);

  return (
    <>
      <ImageGalleryItemImage
        onClick={openModal}
        src={img.webformatURL}
        alt={img.tags}
      />
      {isOpen && (
        <Modal
          image={img.largeImageURL}
          isOpen={isOpen}
          onClose={closeModal}
          alt={img.tags}
        />
      )}
    </>
  );
}

Image.propTypes = {
  img: PropTypes.object,
};
