
import { AppBar, Toolbar, styled, Button } from '@mui/material'; 
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';


const Component = styled(AppBar)`
    background: lightgrey;
    color: black;
    font-weight: bold;
      
`;

const Linked = styled(Link)`
    &:hover {
    text-decoration: underline;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
    }
`

const Logo = styled('img')`
    height: 40px; /* Adjust the size of the logo as needed */
    margin-right: auto; /* Pushes the logo to the left */
`;


const Header = () => {

    const navigate = useNavigate();

    const logout = async () => navigate('/account');
        
    return (
        <Component>
             <Toolbar>
                <Logo src='/logo.png' alt='Logo' /> {/* Path to your logo */}
                <Container>
                    <Linked to='/'>HOME</Linked>
                    <Linked to='/about'>ABOUT</Linked>
                    <Linked to='/contact'>CONTACT</Linked>
                    <Linked to='/login' onClick={logout}>LOGOUT</Linked>
                </Container>
            </Toolbar>
        </Component>
    )
}

export default Header;