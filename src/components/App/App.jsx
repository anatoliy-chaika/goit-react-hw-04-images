import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImage } from 'components/Servises/GetImage';
import { Loader } from 'components/Loader/Loader';
import { Button } from '../Button/Button';
import { GlobalStyles } from '../GlodalStyles/Global.styled';
import ImageList from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import { ErrorMessage } from '../ImageGallery/ImageGallery.styled';
import { AppDiv } from './App.styled';

export function App() {
  const [searchImage, setSearchImage] = useState('');
  const [images, setImages] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalImg, setTotalImg] = useState(0);

  const handleFormSubmit = newSearchImage => {
    if (searchImage !== newSearchImage) {
      setSearchImage(newSearchImage);
      setPage(1);
      setImages([]);
      setTotalImg(0);
    }
  };

  const handleLoad = () => {
    setPage(prev => prev + 1);
  };

  const isShow = page < Math.ceil(totalImg / 12);

  useEffect(() => {
    if (searchImage.trim() === '') {
      return;
    }

    const fetchPictures = async () => {
      setIsLoad(true);
      try {
        const { hits, totalHits } = await getImage(searchImage, page);

        if (hits.length === 0) {
          setIsLoad(false);
          setImages([]);
          setTotalImg(0);
          return toast.error(`Nothing found for ${searchImage}!`);
        }
        setImages(prevImages => [...prevImages, ...hits]);
        setIsLoad(false);
        setTotalImg(totalHits);
      } catch (error) {
        setError(error);
      }
    };
    fetchPictures();
  }, [page, searchImage]);

  return (
    <AppDiv>
      <ToastContainer
        position="top-right"
        toastOptions={{
          duration: 1500,
        }}
      />
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageList images={images} />
      {isLoad && <Loader />}
      {isShow && <Button onClick={handleLoad}></Button>}
      {error !== '' && <ErrorMessage>{error}</ErrorMessage>}
      <GlobalStyles />
    </AppDiv>
  );
}
