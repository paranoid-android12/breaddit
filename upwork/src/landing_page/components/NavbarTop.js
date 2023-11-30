import {Navbar, Container} from 'react-bootstrap';
import '../styles/navbarStyle.css';
import axios from 'axios';
import { useEffect,useState } from 'react';

function TopNav(){
    const [user, setUser] = useState([]);
    const url = 'http://localhost:8080/upwork_server/api/controller/tunnel.php';
    let mainSessionPackage = new FormData();
    mainSessionPackage.append('function', 'fetchUserData')
    
    
    const UserSesh = () => {
        axios.post(url, mainSessionPackage, {withCredentials: true})
        .then(response => {
            setUser(response.data);
        })
        .catch(error => alert(error.message));
    }

    useEffect(UserSesh, []);

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
                            <p className='username'>u/{user.username}</p>
                            <p className='karmaCount'>{user.karma} Karma</p>
                        </div>
                        <img src='/timeline_assets/down_arrow_min.png' className='downArrow'></img>
                    </div>
                </Container>    
            </Navbar>
        </div>
    )
}

export default TopNav;