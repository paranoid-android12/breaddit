import {Nav, Navbar, NavDropdown, Container, Row, Col} from 'react-bootstrap';
import '../styles/navbarStyle.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import Timeline from '../Timeline';

function TopNav(){
    const url = 'http://localhost:8080/upwork_server/api/controller/tunnel.php'
    let fData = new FormData();
    fData.append('function', 'fetchUserData')

    const [username, setUsername] = useState('');
    const [karma, setKarma] = useState();

    //Upload post object to main sql api
    const fetchUserdata = () => {

        axios.post(url, fData, {withCredentials: true})
        .then(response => {
                setUsername(response.data.username);
                setKarma(response.data.karma);
        })
        .catch(error => alert(error.message));
    }

    useEffect(fetchUserdata, []);

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
                            <p className='username'>u/{username}</p>
                            <p className='karmaCount'>{karma} Karma</p>
                        </div>
                        <img src='/timeline_assets/down_arrow_min.png' className='downArrow'></img>
                    </div>
                </Container>    
            </Navbar>
        </div>

    )
}

export default TopNav;