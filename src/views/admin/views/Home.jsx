import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SideBar from "../components/SideBar";
import checkLoggedIn from './../../../libs/sessions-control/check-logged-in';

function Home() {
    const navigate = useNavigate();
    checkLoggedIn(() => navigate('/admin/login'));

    useEffect(() => {
        document.title = "Admin Home"
        checkLoggedIn(() => navigate('/admin/login'));
    }, [])

    return ( 
        <>
            <SideBar/>
            <div className="container">
                <h1>Bienvenido al administrador de Los santos de la parrilla</h1>
                <p>
                    Presione el botón situado en la esquina inferior izquierda para empezar a administrar los eventos, concursos y accesos de la página.
                </p>
                <br />
                <br />
                <h3>
                    <strong>
                        Llene el formulario para agregar eventos, concursos o dar acceso a nuevos administradores.
                    </strong>
                </h3>
                <p>
                    Puede eliminar, editar cambiar y ver los datos correspondientes de la manera más simple y eficaz. 
                </p>
            </div>
        </>
    );
}

export default Home;