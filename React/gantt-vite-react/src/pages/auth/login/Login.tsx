//This is a modified version of the open source Material UI React Login page template

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Logo from '/src/assets/gandalf.svg'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RepoLink(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'View the source code here '}
      <Link color="inherit" href="https://github.com/PratulSR/Gantt">
        ELEC5619 Group 27
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Login() {

  const moveDirectory = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    });

    // api call, send to backend, receive tokem
    const data_json = JSON.stringify(Object.fromEntries(data.entries()));


    axios.post("http://localhost:8080/login", data_json, {headers: {
      'Content-Type' :'application/json'
    }})
    .then((response) => {
      localStorage.setItem("userId", response.data)
      console.log(response.data)

    })
    .catch((error) => console.log(error));
    moveDirectory('/home');
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
        <Box
            component="img"
            sx={{
              height: 233,
              width: 350,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            src= {Logo}
          />
          <Typography component="h1" variant="h5">
            Sign in to Ganttalf
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* TODO: Implement persistence */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <RepoLink sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}