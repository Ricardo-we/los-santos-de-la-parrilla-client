import Modal from "./Modal";

function Alert({ message='Alert', onConfirm, handleClose, visible }) {
    return ( 
        <Modal handleClose={handleClose} visible={visible} style={{backgroundColor: 'red', height: 200}}>
            <div className="container d-flex flex-column align-items-center justify-content-evenly text-white">
                <h2>{message}</h2>
                <div className="container d-flex flex-wrap justify-content-evenly">
                    <button className="btn btn-danger" onClick={handleClose}>
                        cancelar
                    </button>
                    <button className="btn btn-primary" onClick={onConfirm}>
                        confirmar
                    </button>
                </div>
            </div>
        </Modal>        
    );
}

export default Alert;