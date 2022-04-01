import { useState } from "react";
import '../css/SideBar.css';
import logo from '../../img/los-santos-parrilla-logo.jpg'; 

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars,faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function SideBar() {
    const [sideBarOpen, setSideBarOpen] = useState(false);

    return (
        <>
            <div className={sideBarOpen? "sidebar-container sidebar-open" : "sidebar-container"}>
                    <img src={logo} alt="" className="sidebar-logo"/>
                    <h5 className="text-black">Los santos de la parrilla</h5>
                <button className="sidebar-btn sidebar-btn-close" onClick={() => setSideBarOpen(false)}>
                    <FontAwesomeIcon icon={faXmark} size="lg"/>
                </button>
                

                <div className="sidebar-nav">
                    <Link to="/admin/home" className="sidebar-link">Home</Link>
                    <Link to="/admin/admins" className="sidebar-link">Administradores</Link>
                    <Link to="/admin/events" className="sidebar-link">Eventos</Link>
                    <Link to="/admin/contests" className="sidebar-link">Competencias</Link>
                    <Link to="/admin/gallery" className="sidebar-link">Gallery</Link>
                </div>
            </div>
            <button className="sidebar-btn btn-open" onClick={() => setSideBarOpen(true)}>
                <FontAwesomeIcon icon={faBars} size="lg"/>
            </button>
        </> 
    );
}

export default SideBar;