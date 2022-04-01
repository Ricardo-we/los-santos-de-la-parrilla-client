import { Link } from "react-router-dom";
import NavBar from "../main-views/components/NavBar";

function Error404() {
    return ( 
        <>
            <NavBar/>
            <div className="container mt-5 d-flex flex-column align-items-start justify-content-evenly">
                <h1>Error 404</h1>
                <h2>Esta página no existe</h2>
                <Link to="/" className="btn btn-outline-primary me-auto">Regresar a Home</Link>
            </div>
        </>
    );
}

export default Error404;