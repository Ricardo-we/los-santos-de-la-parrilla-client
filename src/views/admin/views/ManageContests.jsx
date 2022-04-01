import { useState, useEffect } from "react";
import { getContests, createContest, deleteContest, updateContest } from "../../../libs/requests/contests-requests";
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

function ManageContests() {
    const navigate = useNavigate();

    const [modalVisible, setModalVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false)
    const [contests, setContests] = useState([])
    const [selectedContestForUpdate, setSelectedContestForUpdate] = useState({});
    const [selectedIdForDelete, setSelectedIdForDelete] = useState('');

    const getContestsHandler = async () => {
        const response = await getContests();
        setContests(response);
    }

    useEffect(() => {
        document.title = "Administrar Concursos"
        checkLoggedIn(() => navigate("/admin/login"))
        getContestsHandler()
    }, [])

    return ( 
    <>
        <SideBar/>
        <Toast/>
        <UpdateModal 
            previousData={selectedContestForUpdate}
            visible={modalVisible} 
            handleClose={() => setModalVisible(false)} 
            afterSubmitAction={getContestsHandler}
        />
        <Alert
            onConfirm={() => {
                deleteContest(admin_key, selectedIdForDelete)
                    .then(getContestsHandler)
                    .then(setAlertVisible(false))
                    .then(() => toast.success('Concurso eliminado'))
            }}
            message="Esta seguro de eliminar este concurso?"
            handleClose={() => setAlertVisible(false)}
            visible={alertVisible}
        />

        <div className="container">
            <h1>Administrar concursos publicados</h1>
            <ContestForm
                onSubmit={(title, description, image) => {
                    createContest(admin_key, title, description, image)
                        .then(getContestsHandler)
                        .then(() => toast.success('Concurso añadido'));
                }}
            />
            <Table  
                textCenter={true}
                tableHeads={['title', 'description', 'options']}
                tableRows={contests.map((contest, index) => (
                    <tr key={index}>
                        <td>{contest.title}</td>
                        <td className="d-flex align-items-center justify-content-center" style={{height: '160px'}}>
                            <p  style={{ maxWidth: '500px', maxHeight: '100%', overflowY: 'auto'}}>
                                {contest.description}
                            </p>
                        </td>
                        <td>
                            <button className="btn btn-success" onClick={() => {
                                setSelectedContestForUpdate(contest)
                                setModalVisible(true);
                            }}>
                                <FontAwesomeIcon icon={faPen}/>
                            </button>
                            <button className="btn btn-danger" onClick={() =>{
                                setSelectedIdForDelete(contest._id)
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


const ContestForm = ({ onSubmit, defaultValues={} }) => {
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

const UpdateModal = ({ visible, handleClose, previousData, afterSubmitAction }) => (
    <Modal visible={visible} handleClose={handleClose} style={{flexWrap: 'wrap', height: '500px'}}>
        <h1>Editar administrador</h1>
        <ContestForm 
            onSubmit={(title, description, image) => {
                updateContest(admin_key, previousData._id, title, description, image)
                    .then(afterSubmitAction)
                    .then(handleClose)
                    .then(() => toast.success("Concurso actualizado"))
            }} 
            defaultValues={previousData}
        />
    </Modal>
)

export default ManageContests;