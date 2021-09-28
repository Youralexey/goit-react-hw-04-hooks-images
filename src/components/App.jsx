import React, { useState, useEffect } from 'react';
import { CustomApp } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button.styled'
import Modal from './Modal/Modal';
import api from '../services/galleryApi';
import Loader from "react-loader-spinner";
import toast, { Toaster } from 'react-hot-toast';

const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
};


export default function App() {
    const [imageName, setImageName] = useState(null);
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [status, setStatus] = useState(Status.IDLE);
    // const [error, setError] = useState(null);

    useEffect(() => {
        if (status === Status.PENDING) {
            api
                .fetchImages(imageName, page)
                .then(newImages => {
                    if (newImages.length === 0) {
                        toast.error(`Oops, we did not find such picture as ${imageName}`);
                        setStatus(Status.IDLE);
                        return;
                    }
                    setImages(prevImages => [...prevImages, ...newImages]);
                    setStatus(Status.RESOLVED);
                })
                .catch(error => {
                    // setError(error);
                    setStatus(Status.REJECTED);
                });
        }

    }, [imageName, page, status])

    useEffect(() => {
         window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        })
    }, [images])
    
    // if (status === Status.REJECTED) {
    //     return {error.message}
    // }


    const searchbarInputValueHandler = (value) => {
        // console.log('value :>> ', value);
        if (value.trim() !== '') {
            setImageName(value);
            setStatus(Status.PENDING);
        }

        if (imageName !== value) {
            setImages([]);
            setPage(1);
        }

    }


    const handleLoadMoreBtnClick = () => {
        setPage(page => page + 1);
        setStatus(Status.PENDING);
    }

    const handleSelectImage = data => {
        setSelectedImage(data);
    }

    const closeModal = () => {
        setSelectedImage(null);
    }

    return (
        <CustomApp>
            <Searchbar onSubmit={searchbarInputValueHandler} />
            <Toaster />
            <ImageGallery images={images} onSelect={handleSelectImage} />
            {status === Status.RESOLVED && <Button type="button" onClick={handleLoadMoreBtnClick}>Load more</Button>}
            {selectedImage && <Modal
                src={selectedImage.largeImageURL}
                alt={selectedImage.tags}
                onClose={closeModal}
                state={status} />}
            {status === Status.PENDING && <Loader
                type="Circles"
                color="#00BFFF" height={300} width={300}
                timeout={5000}
            />}
        </CustomApp>)

}