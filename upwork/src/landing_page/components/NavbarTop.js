import {Navbar, Container, Dropdown, Form} from 'react-bootstrap';
import '../styles/navbarStyle.css';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TopNav(){
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const url = 'http://localhost:8080/upwork_server/api/controller/tunnel.php';
    let mainSessionPackage = new FormData();
    mainSessionPackage.append('function', 'fetchUserData')

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
    
    
    const UserSesh = () => {
        axios.post(url, mainSessionPackage, {withCredentials: true})
        .then(response => {
            setUser(response.data);
        })
        .catch(error => alert(error.message));
    }

    useEffect(UserSesh, []);

    function logout(){

        const logoutPack = new FormData();
        logoutPack.append('function', 'logout');

        axios.post(url, logoutPack, {withCredentials: true})
        .then(response => {
            alert("You are being logged out.");
            navigate('../login');
        })
        .catch(error => alert(error.message));
    }

    function toUser(){
        const userUrl = "../timeline/u/" + user.username;
        navigate(userUrl, {state:{userData: user}});
    }

    return(
        <div className='navFollower'>
            <Navbar expand="lg" className='mainNav'>
                <Container>
                    <Navbar.Brand href="/timeline" className='titleNav'>Breaddit</Navbar.Brand>

                    <form className='searchBar'>
                            <img style={{scale: '45%'}} src='/timeline_assets/search_min.png'></img>
                            <input className='searchInput' type="search" placeholder='Search Breaddit'></input>
                    </form>

                    <Dropdown show={isDropdownOpen} onToggle={handleDropdownToggle}>
                        <div className='userInfoBox'>
                            <div className='d-flex col' onClick={handleDropdownToggle}>
                                <div className='userInfoMargin'>
                                    <p className='username'>u/{user.username}</p>
                                    <p className='karmaCount'>{user.karma} Karma</p>
                                </div>
                                <img src='/timeline_assets/down_arrow_min.png' className='downArrow'></img>
                            </div>
                            <Dropdown.Menu className='nav_dropdownBox'>
                                <div className='nav_myStuffs'>My Stuff</div>
                                <div className='nav_dropItem' onClick={() => toUser()}>Profile</div>
                                <div className='nav_dropItem' href="#/action-3">User Settings</div>
                                <div className='nav_dropItem' href="#/action-3">Create a Community</div>
                                <hr style={{opacity: '100%'}}></hr>
                                <div className='nav_myStuffs'>View Settings</div>
                                <div className='nav_dropItem'>
                                    <Form className='d-flex col'>
                                        Dark Mode
                                        <Form.Check style={{marginLeft: '10px'}}
                                            type="switch"
                                            id="custom-switch"
                                        />
                                    </Form>
                                </div>
                                <hr style={{opacity: '100%'}}></hr>
                                <div className='nav_myStuffs'>Account Settings</div>
                                <div className='nav_dropItem' onClick={() => logout()}>Logout</div>
                            </Dropdown.Menu>
                        </div>

                    </Dropdown>


                </Container>    
            </Navbar>
        </div>
    )
}

export default TopNav;