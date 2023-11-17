import {Nav, Navbar, NavDropdown, Container, Row, Col} from 'react-bootstrap';
import '../styles/navbarStyle.css';
import { Link, useNavigate } from 'react-router-dom';

function TopNav(){
    const navigate = useNavigate();

    return(
        <div className='navFollower'>
            <Navbar expand="lg" className='mainNav'>
                <Container>
                    <Navbar.Brand href="./" className='titleNav'>Breaddit</Navbar.Brand>

                    <form className='searchBar'>
                            <img style={{scale: '45%'}} src='./timeline_assets/search_min.png'></img>
                            <input className='searchInput' type="search" placeholder='Search Breaddit'></input>
                    </form>

                    <div onClick={() => navigate('../Login.js')} className='loginButton'>Log In</div>
                </Container>    
            </Navbar>
        </div>

    )
}

export default TopNav;