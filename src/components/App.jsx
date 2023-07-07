import { AppS } from './App.styled';
import React from 'react';

import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import { fetchPost } from 'services/api';

export function App() {
  const [imageName, setImageName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [totalImages, setTotalImages] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const prevImageNameRef = React.useRef('');
  const prevPageRef = React.useRef(1);

  React.useEffect(() => {
    const fetchData = async () => {
      if (
        imageName !== prevImageNameRef.current ||
        page !== prevPageRef.current
      ) {
        try {
          setLoading(true);

          const data = await fetchPost(imageName, page);
          setImages([...images, ...data.hits]);
          setTotalImages(data.totalHits);
        } catch (error) {
          setError(error);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [error, imageName, images, page]);

    React.useEffect(() => {
      prevImageNameRef.current = imageName;
      prevPageRef.current = page;
    }, [imageName, page]);
  
const onSubmit = imageName => {
  if (imageName !== prevImageNameRef.current) {
    setImageName(imageName);
    setPage(1);
    setImages([]);
    setTotalImages(0);
  }
};
  const onLoadMore = () => {
    // this.setState(prevState => ({
    //   page: prevState.page + 1,
    // }));
    setPage(page + 1);
  };
  const openModal = selectedImage => {
    // this.setState({ modalOpen: true, selectedImage });
    setModalOpen(true);
    setSelectedImage(selectedImage);
  };

  const closeModal = () => {
    // this.setState({ modalOpen: false, selectedImage: null });
    setModalOpen(false);
    setSelectedImage(null);
  };
  const showButton = images.length + 1 < totalImages;
  return (
    <AppS>
      <SearchBar onSubmit={onSubmit} />
      <ImageGallery data={images} onItemClick={openModal} />
      {images.length > 0 && showButton && <Button onLoadMore={onLoadMore} />}
      {loading && images.length===0 && <Loader />}
      {modalOpen && <Modal image={selectedImage} onClose={closeModal} />}
    </AppS>
  );
}
