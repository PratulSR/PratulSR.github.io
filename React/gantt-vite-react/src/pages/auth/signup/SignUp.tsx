//This is a modified version of the open source Material UI React Login page template

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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

export default function SignUp() {

  const moveDirectory = useNavigate();


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // api call, send to backend, receive tokem
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      name: data.get('name')
    });

    const data_json = JSON.stringify(Object.fromEntries(data.entries()));

    console.log(data_json)


    axios.post("http://localhost:8080/add", data_json, {headers: {
      'Content-Type' :'application/json'
    }})
    .then((response) => console.log(response))
    .catch((error) => console.log(error));

    moveDirectory('/login');
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
          <Typography component="h1" variant="h5" textAlign={'center'}>
            Sign up to Ganttalf
          </Typography>

          <Box
            sx={{
                marginTop: 2,
                alignItems: 'center',
                justifyContent: 'center',
            }}
          >
            <Typography variant='h6' fontSize={13.5}>
                Join the Ganttalf community and improve your workflow!
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={1} rowSpacing={.25}>
            <Grid item xs={12}>
                <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            </Grid>
          </Box>
        </Box>
        <RepoLink sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}

