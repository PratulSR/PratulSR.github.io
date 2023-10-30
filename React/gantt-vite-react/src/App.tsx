import Landing from './pages/Landing/index'
import Login from './pages/auth/login/Login'
import SignUp from './pages/auth/signup/SignUp'
import Gantt from './pages/Gantt'
import {BrowserRouter, Routes, Route} from "react-router-dom"

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { lightGreen, lime } from '@mui/material/colors'
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home'

import CreateChart from './pages/GanttFunctionality/CreateChart'

import TaskList from './pages/TaskList/index'



const theme = createTheme({
  palette: {
    primary: lightGreen,
    secondary: lime,
    background: {
      default: '#f0f4c3'
    }
  },
  typography: {
    fontFamily: 'Open Sans',
    fontWeightLight: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    fontWeightRegular: 700
  }
})

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <BrowserRouter>
            <Routes>
              {/** root address should be landing with no login, 
               * and home with login, implemented with persistence */}
              {/**<Route path='/gantt' element={<Gantt />} />*/}
              <Route path='/' element={<Landing/>}/>  
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/createnew' element={<CreateChart/>} />

              {/** these are test routes */}
              <Route path='/home' element={<Home/ >} />
              <Route path='/gantt' element={<Gantt/ >} />
         
      

              <Route path='/taskList' element={<TaskList/>}/>
                

             
          
              


        
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
