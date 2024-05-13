import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const handleToast = (type, message) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}
