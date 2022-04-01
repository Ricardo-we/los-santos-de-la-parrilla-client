import { useState, useEffect } from "react";
import { getAdmins, addAdmin, updateAdmin, deleteAdmin } from "../../../libs/requests/admin-requests";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import checkLoggedIn from "../../../libs/sessions-control/check-logged-in";

import Modal from "../../public-components/Modal";
import Alert from "../../public-components/Alert";
import FormControl from "../../public-components/FormControl";
import SideBar from "../components/SideBar";
import Table from "../../public-components/Table";
import Toast from "../../public-components/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";


const admin_key = localStorage.getItem('admin_key');

function ManageAdmins() {
    const navigate = useNavigate();

    const [modalVisible, setModalVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false)
    const [admins, setAdmins] = useState([{id: 0, username: '', password: '', email: ''}])
    const [selectedAdminForUpdate, setSelectedAdminForUpdate] = useState({});
    const [selectedIdForDelete, setSelectedIdForDelete] = useState('');

    const getAdminsHandler = async () => {
        const response = await getAdmins(admin_key);
        setAdmins(response);
    }

    useEffect(() => {
        document.title = "Administradores"
        checkLoggedIn(() => navigate("/admin/login"))
        getAdminsHandler()
    }, [])

    return ( 
    <>
        <SideBar/>
        <Toast/>

        <UpdateModal 
            previousData={selectedAdminForUpdate}
            visible={modalVisible} 
            handleClose={() => setModalVisible(false)} 
            afterSubmitAction={getAdminsHandler}
        />
        <Alert
            onConfirm={() => {
                deleteAdmin(admin_key, selectedIdForDelete)
                    .then(getAdminsHandler)
                    .then(setAlertVisible(false))
                    .then(() => toast.success('Administrador eliminado'))
            }}
            message="Esta seguro de eliminar este administrador?"
            handleClose={() => setAlertVisible(false)}
            visible={alertVisible}
        />

        <div className="container">
            <h1>Manage admins</h1>
            <AdminForm
                onSubmit={(username, password, email) => {
                    addAdmin(admin_key, username, password, email)
                        .then(getAdminsHandler)
                        .then(() => toast.success("Administrador añadido"))
                    ;
                }}
            />
            <Table 
                tableHeads={['username', 'password', 'email', 'options']}
                tableRows={admins.map((admin, index) => (
                    <tr key={index}>
                        <td>{admin.username}</td>
                        <td>{admin.password}</td>
                        <td>{admin.email}</td>
                        <td>
                            <button className="btn btn-success" onClick={() => {
                                setSelectedAdminForUpdate(admin)
                                setModalVisible(true);
                            }}>
                                <FontAwesomeIcon icon={faPen}/>
                            </button>
                            <button className="btn btn-danger" onClick={() =>{
                                setSelectedIdForDelete(admin._id)
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


const AdminForm = ({ onSubmit, defaultValues={} }) => {
    const [username, setUsername] = useState(defaultValues.username || '');
    const [password, setPassword] = useState(defaultValues.password || '');
    const [email, setEmail] = useState(defaultValues.email || '');

    return (
        <form 
            className="form container" 
            onSubmit={e => {
                e.preventDefault();
                onSubmit(username, password, email)
            }}
        >
            <FormControl label="Username" value={username} onChange={text => setUsername(text)}/>
            <FormControl label="Password" type="password" value={password} onChange={text => setPassword(text)}/>
            <FormControl label="Email" type="email" value={email} onChange={text => setEmail(text)}/>
            <button type="submit" className="btn btn-primary w-100">
                Submit
            </button>
        </form>
    )
}

const UpdateModal = ({ visible, handleClose, previousData, afterSubmitAction }) => (
    <Modal visible={visible} handleClose={handleClose} style={{flexWrap: 'wrap', height: '400px'}}>
        <h1>Editar administrador</h1>
        <AdminForm 
            onSubmit={(username, password, email) => {
                updateAdmin(admin_key, previousData._id, username, password, email)
                    .then(afterSubmitAction)
                    .then(handleClose)
                    .then(() => toast.success("Administrador modificado correctamente"))
            }} 
            defaultValues={previousData}
        />
    </Modal>
)

export default ManageAdmins;