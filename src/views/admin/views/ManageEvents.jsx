import { useState, useEffect } from "react";
import { getEvents, createEvent, updateEvent, deleteEvent } from "../../../libs/requests/events-requests";
import { useNavigate } from "react-router-dom";
import checkLoggedIn from "../../../libs/sessions-control/check-logged-in";

import Modal from "../../public-components/Modal";
import Alert from "../../public-components/Alert";
import FormControl, { TextAreaFormControl } from "../../public-components/FormControl";
import SideBar from "../components/SideBar";
import Table from "../../public-components/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import Toast from "../../public-components/Toast";

const admin_key = localStorage.getItem('admin_key');

function ManageEvents() {
    const navigate = useNavigate();

    const [modalVisible, setModalVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false)
    const [events, setEvents] = useState([{id: 0}])
    const [selectedEventForUpdate, setSelectedEventForUpdate] = useState({});
    const [selectedIdForDelete, setSelectedIdForDelete] = useState('');

    const onSubmitNewEvent = (title, description, image) => {
        createEvent(admin_key, title, description, image)
            .then(getEventsHandler)
            .then(() => toast.success('Evento añadido'));
    }

    const alertOnConfirm = () => {
        deleteEvent(admin_key, selectedIdForDelete)
            .then(getEventsHandler)
            .then(setAlertVisible(false))
            .then(() => toast.success('Evento eliminado'))
    }

    const getEventsHandler = async () => {
        const response = await getEvents();
        setEvents(response);
    }

    useEffect(() => {
        document.title = "Administrar Eventos"
        checkLoggedIn(() => navigate("/admin/login"))
        getEventsHandler()
    }, [])

    return ( 
    <>
        <SideBar/>
        <Toast/>
        <UpdateModal 
            previousData={selectedEventForUpdate}
            visible={modalVisible} 
            handleClose={() => setModalVisible(false)} 
            afterSubmitAction={getEventsHandler}
        />
        <Alert
            onConfirm={alertOnConfirm}
            message="Esta seguro de eliminar este concurso?"
            handleClose={() => setAlertVisible(false)}
            visible={alertVisible}
        />

        <div className="container">
            <h1>Administrar eventos publicados</h1>
            <EventForm onSubmit={onSubmitNewEvent}/>
            <Table 
                tableHeads={['title', 'description', 'options']}
                tableRows={events.map((event, index) => (
                    <tr key={index}>
                        <td>{event.title}</td>
                        <td style={{height: '120px'}}>
                            <p style={{ maxWidth: '4    50px', height: '100%', overflowY: 'auto'}}>
                                {event.description}
                            </p>
                        </td>
                        <td>
                            <button className="btn btn-success" onClick={() => {
                                setSelectedEventForUpdate(event)
                                setModalVisible(true);
                            }}>
                                <FontAwesomeIcon icon={faPen}/>
                            </button>
                            <button className="btn btn-danger" onClick={() =>{
                                setSelectedIdForDelete(event._id)
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


const EventForm = ({ onSubmit, defaultValues={} }) => {
    const [title, setTitle] = useState(defaultValues.title || '');
    const [description, setDescription] = useState(defaultValues.description || '');
    const [image, setImage] = useState();

    return (
        <form 
            className="form container" 
            onSubmit={e => {
                e.preventDefault();
                onSubmit(title, description, image)
            }}
        >
            <FormControl label="Titulo" value={title} onChange={text => setTitle(text)}/>
            <TextAreaFormControl label="Descripción" onChange={text => setDescription(text)} value={description}/>
            <FormControl label="Image" type="file" onChange={file => setImage(file)}/>
            <button type="submit" className="btn btn-primary w-100">
                Submit
            </button>
        </form>
    )
}

const UpdateModal = ({ visible, handleClose, previousData, afterSubmitAction }) => {
    const onSubmitAction = (title, description, image) => {
        updateEvent(admin_key, previousData._id, title, description, image)
            .then(afterSubmitAction)
            .then(handleClose)
            .then(() => toast.success("Evento actualizado"))
    }

    return (
        <Modal visible={visible} handleClose={handleClose} style={{flexWrap: 'wrap', height: '500px'}}>
            <h1>Editar administrador</h1>
            <EventForm 
                onSubmit={onSubmitAction} 
                defaultValues={previousData}
            />
        </Modal>
    )
}

export default ManageEvents;