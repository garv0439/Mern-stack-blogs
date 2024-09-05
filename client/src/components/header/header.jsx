
import { AppBar, Toolbar, styled, Button } from '@mui/material'; 
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';


const Component = styled(AppBar)`
    background: lightgrey;
    color: black;
    font-weight: bold;
      
`;

const Linked = styled(Link)`
color: #000;
    &:hover {
    text-decoration: underline;
    
`;

const LoBtn = styled(Button)`
     background: red;
     color: cyan;
     margin : 5px;
    //  padding: 50px
     border-radius: 20px;
    &:hover {
    text-decoration: underline;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        text-decoration: none;
    }
`

const Logo = styled('img')`
    height: 40px; /* Adjust the size of the logo as needed */
    margin-right: auto; /* Pushes the logo to the left */
`;


const Header = () => {

    const navigate = useNavigate();

    const logout = async () => navigate('/login');

    
    const loBtn = async () => navigate('/');
        
    return (
        <Component>
             <Toolbar>
                <Logo src='/logo.png' onClick={loBtn} alt='Logo' />
                <Container>
                    <Linked to='/'>HOME</Linked>
                    <Linked to='/about'>ABOUT</Linked>
                    <Linked to='/contact'>CONTACT</Linked>
                    <a><LoBtn to='/login' onClick={logout}>LOGOUT</LoBtn></a>
                </Container>
            </Toolbar>
        </Component>
    )
}

export default Header;