
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RootRouter from './routes/Route'
import { ThemeProvider, createTheme } from '@mui/material'

function App() {
  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  })
    
  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <RootRouter />
      </ThemeProvider>

    </>
  )
}
export default App
