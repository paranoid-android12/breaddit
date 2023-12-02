import {Col} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/postStyle.css';

function Side(){
    return(
        <div className='sideBar d-none d-lg-block'>
            <div className='sideBarStick'>
                <br></br>
                <ul className='nav nav-pills flex-column mb-auto'>
                    <li className='sideContent nav-item d-flex col'>
                        <img className='sideIcon' src='/timeline_assets/home.png'></img>
                        <p className='sideBarText text-white'>Home</p>
                    </li>
                    <li className='sideContent nav-item d-flex col'>
                        <img className='sideIcon' src='/timeline_assets/popular.png'></img>
                        <p className='sideBarText text-white'>Popular</p>
                    </li>
                    <hr></hr>
                    <li className='sideContent nav-item'>
                        <p className='sideBarText text-white'>About Breaddit</p>
                    </li>
                    <li className='sideContent nav-item'>
                        <p className='sideBarText text-white'>Help</p>
                    </li>
                    <li className='sideContent nav-item'>
                        <p className='sideBarText text-white'>Settings</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Side;