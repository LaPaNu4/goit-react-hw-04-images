import { AppS } from './App.styled';
import { useState, useEffect } from 'react';

import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import { fetchPost } from 'services/api';

export function App() {
  const [imageName, setImageName] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
if(!imageName) return
        try {
          setLoading(true);

          const data = await fetchPost(imageName, page);
          setImages(prev =>[...prev, ...data.hits]);
          setTotalImages(data.totalHits);
        } catch (error) {
          console.log("🚀 ~ file: App.jsx:34 ~ fetchData ~ error:", error)
        } finally {
          setLoading(false);
        }
    };

    fetchData();
  }, [ imageName, page]);
  
const onSubmit = query => {
  if (imageName !== query) {
    setImageName(query);
    setPage(1);
    setImages([]);
    setTotalImages(0);
  }
};
  const onLoadMore = () => {
    setPage(prev=>prev + 1);
  };
  const openModal = selectedImage => {
    setModalOpen(true);
    setSelectedImage(selectedImage);
  };

  const closeModal = () => {
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
