import logo from './../../img/los-santos-parrilla-logo.jpg';
import './../css/NavBar.css';

import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function NavBar() {

    return ( 
    <Navbar bg="light" variant="light" expand="sm">
        <Container>
            <Navbar.Brand href="#home">
                <img
                    style={{borderRadius: '100%', objectFit: 'cover'}}
                    alt="Los santos de la parrilla"
                    src={logo}
                    width='70px'
                    height='70px'
                    className="d-inline-block align-top"
                />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{borderRadius: 0, borderColor: 'transparent'}}>
                <FontAwesomeIcon icon={faBars}/>
            </Navbar.Toggle>
            <Navbar.Collapse className="ms-auto" id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/contests" className="nav-link">Competencias</Link>
                    <Link to="/events" className="nav-link">Eventos</Link>
                    <Link to="/gallery" className="nav-link">Galería</Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}

export default NavBar;