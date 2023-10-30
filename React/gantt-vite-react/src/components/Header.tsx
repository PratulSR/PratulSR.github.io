import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import Logo from '/src/assets/gandalf.svg'
import { LockPerson } from '@mui/icons-material';


export default function Header() {

const navigate = useNavigate();
const Logout = () => {
    localStorage.removeItem("userEmail");
    navigate('/'); // go to homepage
  };

  const CreateChart = () => {
    navigate('/createnew')
  }


  return (
    <Box>
          <AppBar sx= {{bgcolor:'primary'}}>
          <Toolbar>
              <Box display="flex" alignItems="center" flexGrow={1}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'black' }}>
                  <Box 
                  component='img'
                  display='flex'
                  sx={{
                      height:60,
                      borderRadius: 2,
                      m: 1.75
                  }}
                  alt='logo'
                  src={Logo}
                  />
                  <Typography 
                    component='div' 
                    variant='h4' 
                    color="inherit"
                    sx={{ mr: 3 }}
                  >
                    Ganttalf
                  </Typography>

                  
                </Link>
              </Box>

              <Button 
                  color='primary' 
                  type='submit' 
                  variant='contained' 
                  onClick={CreateChart}
                  style ={{marginRight: '0.5rem',  backgroundColor: 'lightblue'}}
                  >
                    Create Chart 
                  </Button> 

              <Button 
                color='secondary' 
                type='submit' 
                variant='contained' 
                endIcon={<LockPerson/>}
                onClick={Logout}
              > 
                Log Out
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
  );
                }
