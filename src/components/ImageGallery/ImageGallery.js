/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';

import { getImage } from 'components/Servises/GetImage';
import { useState, useEffect } from 'react';
import { ImageGallery, ErrorMessage } from './ImageGallery.styled';
import { Button } from '../Button/Button';

export default function ImageList({ imageName }) {
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState();
  const [totalImg, setTotalImg] = useState(0);

  const handleLoad = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    setPage(1);
    setIsLoad(false);
    setImages([]);
    setTotalImg(0);
    setName(imageName);
  }, [imageName]);

  useEffect(() => {
    if (imageName.trim() === '') {
      return;
    }

    const fetchPictures = async () => {
      setIsLoad(true);
      try {
        const { hits, totalHits } = await getImage(name, page);

        if (hits.length === 0) {
          setIsLoad(false);
          setImages([]);
          setTotalImg(0);
          return toast.error(`Nothing found for ${imageName}!`);
        }
        setImages(prevImages => [...prevImages, ...hits]);
        setIsLoad(false);
        setTotalImg(totalHits);
      } catch (error) {
        setError(error);
      }
    };
    fetchPictures();
  }, [name, page]);

  const isShow = page < Math.ceil(totalImg / 12);

  return (
    <>
      {images.length > 0 && (
        <ImageGallery>
          <ImageGalleryItem array={images} />
        </ImageGallery>
      )}
      {isLoad && <Loader />}
      {isShow && <Button onClick={handleLoad}></Button>}
      {error !== '' && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
}

// class ImageList extends Component {
//   state = {
//     images: [],
//     isLoad: false,
//     error: '',
//     page: 1,
//     totalImg: 0,
//   };

//   handleLoad = () => {
//     this.setState(prev => ({ page: prev.page + 1 }));
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     try {
//       if (prevProps.imageName !== this.props.imageName) {
//         this.setState({ images: [], isLoad: true, totalImg: 0, page: 1 });
//         const { hits, totalHits } = await getImage(this.props.imageName);
//         this.setState({
//           images: [...hits],
//           isLoad: false,
//           totalImg: totalHits,
//         });
//         if (hits.length === 0) {
//           return toast.error(`Nothing found for name ${this.props.imageName}!`);
//         }
//         return;
//       }

//       if (
//         this.state.page !== 1 &&
//         prevProps.imageName === this.props.imageName &&
//         prevState.page !== this.state.page
//       ) {
//         this.setState({ isLoad: true });
//         const { hits, totalHits } = await getImage(
//           this.props.imageName,
//           this.state.page
//         );
//         this.setState({
//           images: [...this.state.images, ...hits],
//           isLoad: false,
//           totalImg: totalHits,
//         });
//         return;
//       }
//     } catch (error) {
//       this.setState({
//         error: 'Something went wrong, please try again later',
//         isLoad: false,
//       });
//     }
//   }

//   render() {
//     const { images, isLoad, page, error, totalImg } = this.state;
//     const isShow = page < Math.ceil(totalImg / 12);

//     return (
//       <>
//         {images.length > 0 && (
//           <ImageGallery>
//             <ImageGalleryItem array={images} />
//           </ImageGallery>
//         )}
//         {isLoad && <Loader />}
//         {isShow && <Button onClick={this.handleLoad}></Button>}
//         {error !== '' && <ErrorMessage>{error}</ErrorMessage>}
//       </>
//     );
//   }
// }

// export default ImageList;
