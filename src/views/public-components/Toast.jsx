import { ToastContainer } from 'react-toastify';

function Toast() {
    return <ToastContainer
    position="top-left"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
/>;
}

export default Toast;