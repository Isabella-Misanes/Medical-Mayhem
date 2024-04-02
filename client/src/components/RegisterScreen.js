import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import AuthContext from '../auth';
import MUIErrorModal from './MUIErrorModal';
import { buttonStyle } from '../App';
import { useNavigate } from 'react-router-dom';

export default function RegisterScreen() {
    const {auth} = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordVerify: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        auth.registerUser(
            formData.username,
            formData.email,
            formData.password,
            formData.passwordVerify
        );
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
    }

   let modal = "";
   if(auth.errorMessage !== "") modal = <MUIErrorModal />;

    return (
            <Box sx={{
                height: '90%',
                width: '100%',
                flexDirection: 'column',
                backgroundColor: 'white',
                position: 'absolute',
                textAlign: 'center',
                top: '5%',
                p: 2,
                boxShadow: 10
            }}>
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    onChange={handleChange} 
                                    sx={{
                                        width: '50%'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    sx={{
                                        width: '50%'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                    sx={{
                                        width: '50%'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="passwordVerify"
                                    label="Verify Password"
                                    type="password"
                                    id="passwordVerify"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                    sx={{
                                        width: '50%'
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            id="signUp"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, width: '50%' }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link href="/login/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    {modal}
                </Box>
                <Button variant="contained"
                    sx={[buttonStyle, {
                        left: '2%',
                        bottom: '2%',
                        position: 'absolute'
                    }]}
                    onClick={()=>{navigate("/")}}>
                    Back
                </Button>
            </Box>
    );
}