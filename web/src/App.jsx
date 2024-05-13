
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RootRouter from './routes/Route'
function App() {
  return (
    <>
      <RootRouter />
      <ToastContainer />
    </>
  )
}
export default App
