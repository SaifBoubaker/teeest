import React,{useState,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useDispatch,useSelector} from "react-redux";
import {useNavigate} from  "react-router-dom";
import {toast} from "react-toastify"
import { login } from '../redux/features/authSlice';

function Login(props) {

    const initialstate={
        email:"",
        password:""
    }



    const dispatch= useDispatch()
    const navigate= useNavigate()
    const [formValue,setFormValue]=useState(initialstate)
    const {email,password}= formValue

    const onInputChange=(e)=>{
        let {name,value}=e.target
        setFormValue({...formValue,[name]:value})
    }
    const handleSubmit =(e)=>{
      e.preventDefault()
      if (email&&password) {
        dispatch(login({formValue,navigate,toast}));
      }

    }

    const { error } = useSelector((state) => ({ ...state.auth }));
    useEffect(() => {
      error && toast.error(error);
    }, [error]);
    
    return (

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onClick={handleSubmit}  >
            <TextField
            onChange={onInputChange}
            value={email}
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
            onChange={onInputChange}
            value={password}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
}

export default Login;