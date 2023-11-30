import {Navbar, Container} from 'react-bootstrap';
import '../styles/navbarStyle.css';
import axios from 'axios';
import { useEffect,useState } from 'react';

function TopNav({user}){
    const [tempUser, setTempUser] = useState(user);
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
                            <p className='username'>u/{tempUser.username}</p>
                            <p className='karmaCount'>{tempUser.karma} Karma</p>
                        </div>
                        <img src='/timeline_assets/down_arrow_min.png' className='downArrow'></img>
                    </div>
                </Container>    
            </Navbar>
        </div>
    )
}

export default TopNav;