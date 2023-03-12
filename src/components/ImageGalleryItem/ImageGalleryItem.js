import { ImageGalleryItems } from './ImageGalleryItem.syled';
import { Image } from 'components/Image/Image';

export const ImageGalleryItem = ({ array }) => {
  return array.map(el => {
    return (
      <ImageGalleryItems key={el.id}>
        <Image img={el} />
      </ImageGalleryItems>
    );
  });
};
