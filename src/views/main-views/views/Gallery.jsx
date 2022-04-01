import  { useState, useEffect } from 'react';
import { getAllGallery } from '../../../libs/requests/gallery-requests';

import '../css/Gallery.css'
import Modal from '../../public-components/Modal';
import NavBar from './../components/NavBar';
import Footer from './../components/Footer';

export default function Gallery(){
    const [galleryImages, setGalleryImages] = useState([{image: ''}]);
    const [selectedImage, setSelectedImage] = useState({image: ''});
    const [modalOpen, setModalOpen] = useState(false);

    const getAllGalleryHandler = async () => {
        const response = await getAllGallery();
        setGalleryImages(response);
    }

    useEffect(() => {
        document.title = "Galería"
        getAllGalleryHandler()
    }, [])

    return (
        <>
            <Modal visible={modalOpen} handleClose={() => setModalOpen(false)} style={{height: '500px'}}>
                <img src={selectedImage.image.url} width='100%' height="100%" style={{objectFit: 'cover'}}/>
            </Modal>

            <NavBar/>
            <div style={{width: '95%'}} className="m-auto d-flex flex-wrap align-items-center justify-content-center">
                {galleryImages.map(image => <GalleryImage 
                    image={image} 
                    onClick={() => {
                        setModalOpen(true)
                        setSelectedImage(image);
                    }}
                />)}
            </div>
            <Footer/>
        </>
    )
}

const GalleryImage = ({ onClick, image }) => (
    <div onClick={onClick} className="card gallery-image" >
        <div className="gallery-image-hover">
            <h3>Ver en detalle</h3>
        </div>
        <img src={image.image.url} className="card-img" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
    </div>
)