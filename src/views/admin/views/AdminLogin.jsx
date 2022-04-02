import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import FormControl from './../../public-components/FormControl';
import { getAdmin } from "../../../libs/requests/admin-requests";
import Toast from "../../public-components/Toast";
import checkLoggedIn from './../../../libs/sessions-control/check-logged-in';

function AdminLogin() {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const onSubmitLogin = async e => {
        e.preventDefault();
        const response = await getAdmin(username, password, email);
        
        if(response.key){
            localStorage.setItem('admin_key', response.key)
            navigate('/admin/home')
        }
        toast.warn("Invalid data");
    }

    useEffect(() => {
        document.title = "Login"
        if(checkLoggedIn()) navigate('/admin/home')
    }, [])

    return (
        <div className="container">
            <Toast/>
            <div className="container">
                <form className="form container" onSubmit={onSubmitLogin}>
                    <h1>Inicar sesión</h1>
                    <FormControl label="Username" onChange={text => setUsername(text)}/>
                    <FormControl label="Password" type="password" onChange={text => setPassword(text)}/>
                    <FormControl label="Email" type="email" onChange={text => setEmail(text)}/>
                    <button className="btn btn-success w-100">
                        Submit
                    </button>
                </form>
            </div>
        </div> 
    );
}


export default AdminLogin;