import { createPortal } from "react-dom";
import './css/Modal.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Modal({ children, visible=false, handleClose, style={} }) {
    if(visible) return createPortal( 
        <div className={"backdrop"} onClick={handleClose}>
            <button className="close-btn" onClick={handleClose}>
                <FontAwesomeIcon icon={faXmark} size="2x"/>
            </button>
           <div className={"modal"} style={style} onClick={e => e.stopPropagation()}>
               {children}
            </div> 
        </div>,
        document.getElementById('modal')
    );
    else return null;
}

export default Modal;