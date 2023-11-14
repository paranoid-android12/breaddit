import {Nav, Navbar, NavDropdown, Container, Row, Col} from 'react-bootstrap';
import '../styles/navbarStyle.css';

function TopNav(){
    return(
        <div className='navFollower'>
            <Navbar expand="lg" className='mainNav'>
                <Container>
                    <Navbar.Brand href="./" className='titleNav'>Breaddit</Navbar.Brand>

                    <form className='searchBar'>
                            <img style={{scale: '45%'}} src='./timeline_assets/search_min.png'></img>
                            <input className='searchInput' type="search" placeholder='Search Breaddit'></input>
                    </form>

                    <div className='loginButton'>Log In</div>
                </Container>    
            </Navbar>
        </div>

    )
}

export default TopNav;