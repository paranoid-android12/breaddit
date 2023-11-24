import {Nav, Navbar, NavDropdown, Container, Row, Col} from 'react-bootstrap';
import '../styles/navbarStyle.css';
import { Link, useNavigate } from 'react-router-dom';

// function UserComp(){
//     const navigate = useNavigate();
//     if(){
//         return(
//             <div>asdfasdf</div>
//         )
//     }
//     else{
//         return(
//             <div onClick={() => navigate('../Login.js')} className='loginButton'>Log In</div>
//         )
//     }
// }

function TopNav({username, karma}){
    

    return(
        <div className='navFollower'>
            <Navbar expand="lg" className='mainNav'>
                <Container>
                    <Navbar.Brand href="/timeline" className='titleNav'>Breaddit</Navbar.Brand>

                    <form className='searchBar'>
                            <img style={{scale: '45%'}} src='/timeline_assets/search_min.png'></img>
                            <input className='searchInput' type="search" placeholder='Search Breaddit'></input>
                    </form>

                    <div className='userInfoBox'>
                        <div className='userInfoMargin'>
                            <p className='username'>{username}</p>
                            <p className='karmaCount'>{karma} Karma</p>
                        </div>
                        <img src='/timeline_assets/down_arrow_min.png' className='downArrow'></img>
                    </div>

                    {/* <UserComp/> */}
                </Container>    
            </Navbar>
        </div>

    )
}

export default TopNav;