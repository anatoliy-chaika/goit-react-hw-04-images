import 'react-toastify/dist/ReactToastify.css';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { ImageGallery } from './ImageGallery.styled';

export default function ImageList({ images }) {
  return (
    <>
      <ImageGallery>
        <ImageGalleryItem array={images} />
      </ImageGallery>
    </>
  );
}
