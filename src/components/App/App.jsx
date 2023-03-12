import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { GlobalStyles } from '../GlodalStyles/Global.styled';
import ImageList from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import { AppDiv } from './App.styled';

export function App() {
  const [searchImage, setSearchImage] = useState('');

  const handleFormSubmit = searchImage => {
    setSearchImage(searchImage);
  };

  return (
    <AppDiv>
      <ToastContainer
        position="top-right"
        toastOptions={{
          duration: 1500,
        }}
      />
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageList imageName={searchImage} />

      <GlobalStyles />
    </AppDiv>
  );
}
