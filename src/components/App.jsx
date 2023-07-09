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
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // const prevImageNameRef = useRef('');
  // const prevPageRef = useRef(1);

  useEffect(() => {
    const fetchData = async () => {
if(!imageName) return
        try {
          setLoading(true);

          const data = await fetchPost(imageName, page);
          setImages(prev =>[...prev, ...data.hits]);
          setTotalImages(data.totalHits);
        } catch (erro) {
          setError(erro);
          console.log(error);
        } finally {
          setLoading(false);
        }
      
    };

    fetchData();
  }, [imageName,  page]);
  
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
