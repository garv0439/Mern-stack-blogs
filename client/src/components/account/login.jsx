import { Box, TextField, Button, styled, Typography, IconButton, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React,{ useState, useContext } from 'react';


import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';


import { useNavigate } from 'react-router-dom';



const Component = styled(Box)`
  width: 400px;
  margin: 0 auto; 
  margin-top: -25px; 
  box-shadow: 5px 2px 5px 2px rgb(0 0 0 / 0.6);
`;

const Image = styled('img')({
    width: 300,
    height: 150,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0',
    
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;


const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`
const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const loginInitialValues = {
    username: '',
    password: ''
};



const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};





const Login = ({isUserAuthenticated}) => {

    const imageURL = '/logo.png';

    const [showPassword, setShowPassword] = useState(false);
    const [account, toggleAccount] = useState('login');
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    
    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const handleClickShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };
      
    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }


    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            showError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            
            isUserAuthenticated(true);
            setSuccessMessage('Login Successful!');
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                navigate('/');
            }, 1000);
        } else {
            showError('Something went wrong! please try again later');
        }
    };



    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            setSuccessMessage('Signup Successful!');
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                toggleAccount('login');
            }, 1000);
        } else {
            showError('Something went wrong! please try again later');
        }
    };


    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }



    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="/login" />
                {
                    account === 'login' ?

                        <Wrapper>
                            <TextField variant="standard" value={login.username} onChange={(e) => onValueChange(e)} name='username' label='Enter Username' />
                            <TextField
        variant="standard"
        value={login.password}
        onChange={onValueChange}
        name="password"
        label="Enter Password"
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
                            
                            {error && <Error>{error}</Error>}


                            <LoginButton variant="contained" onClick={() => loginUser()} >Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={() => toggleSignup()}>Create New Account</SignupButton>
                        </Wrapper>
                        :
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name' label='Enter Name' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label='Enter Username' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />


                            {error && <Error>{error}</Error>}
                            <SignupButton onClick={() => signupUser()}>SignUp</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an Account</LoginButton>
                        </Wrapper>
                }
            </Box>

 {/* Snackbar for success message */}
 <Snackbar
                open={success}
                autoHideDuration={1000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={() => setSuccess(false)}
            >
                <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>

        </Component>
    )
}

export default Login;