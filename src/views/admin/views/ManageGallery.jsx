import { useState, useEffect } from "react";
import { createImage, getAllGallery, deleteImage } from "../../../libs/requests/gallery-requests";
import { useNavigate } from "react-router-dom";
import checkLoggedIn from "../../../libs/sessions-control/check-logged-in";

import Alert from "../../public-components/Alert";
import FormControl from "../../public-components/FormControl";
import SideBar from "../components/SideBar";
import Table from "../../public-components/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import Toast from "../../public-components/Toast";

const admin_key = localStorage.getItem('admin_key');

export default function ManageGallery() {
    const navigate = useNavigate();

    const [alertVisible, setAlertVisible] = useState(false)
    const [images, setImages] = useState([{id: 0, image:{url: ''}}])
    const [selectedIdForDelete, setSelectedIdForDelete] = useState('');

    const onSubmitNewImage = (image) => {
        createImage(admin_key, image)
            .then(getGalleryHandler)
            .then(() => toast.success('Imagen añadida!'));
    }

    const alertOnConfirm = () => {
        deleteImage(admin_key, selectedIdForDelete)
            .then(getGalleryHandler)
            .then(setAlertVisible(false))
            .then(() => toast.success('Imagen eliminada'))
    }

    const getGalleryHandler = async () => {
        const response = await getAllGallery();
        setImages(response);
    }

    useEffect(() => {
        document.title = "Administrar Galeria"
        checkLoggedIn(() => navigate("/admin/login"))
        getGalleryHandler()
    }, [])

    return ( 
    <>
        <SideBar/>
        <Toast/>
        <Alert
            onConfirm={alertOnConfirm}
            message="Esta seguro de eliminar este concurso?"
            handleClose={() => setAlertVisible(false)}
            visible={alertVisible}
        />

        <div className="container">
            <h1>Administrar galeria de imagenes</h1>
            <GalleryForm onSubmit={onSubmitNewImage}/>
            <Table 
                tableHeads={['image', 'options']}
                textCenter={true}
                tableRows={images.map((image, index) => (
                    <tr key={index}>
                        <td>
                            <img src={image.image.url} alt="" width="60%" height="120px" style={{objectFit: 'cover'}}/> 
                        </td>
                        <td>
                            <button className="btn btn-danger mt-3" onClick={() =>{
                                setSelectedIdForDelete(image._id)
                                setAlertVisible(true)
                            }}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </button>
                        </td>
                    </tr>
                ))}
            />
        </div>
    </>
    );
}


const GalleryForm = ({ onSubmit }) => {
    const [image, setImage] = useState();

    return (
        <form 
            className="form container" 
            onSubmit={e => {
                e.preventDefault();
                onSubmit(image)
            }}
        >
            <FormControl label="Image" type="file" onChange={file => setImage(file)}/>
            <button type="submit" className="btn btn-primary w-100">
                Submit
            </button>
        </form>
    )
}

