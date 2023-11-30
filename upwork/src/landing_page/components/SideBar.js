import {Col} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/postStyle.css';

function Side(){
    return(
        <Col className='sideBar col-2 d-none d-lg-block'>
            <div className='sideBarStick'>
                <br></br>
                <ul className='nav nav-pills flex-column mb-auto'>
                    <li className='sideContent nav-item d-flex col'>
                        <img className='sideIcon' src='/timeline_assets/home.png'></img>
                        <Link to='../timeline' className='nav-link text-white'>Home</Link>
                    </li>
                    <li className='sideContent nav-item d-flex col'>
                        <img className='sideIcon' src='/timeline_assets/popular.png'></img>
                        <Link className='nav-link text-white'>Popular</Link>
                    </li>
                    <hr></hr>
                    <li className='sideContent nav-item'>
                        <a className='nav-link text-white'>r/Gaming</a>
                    </li>
                    <li className='sideContent nav-item'>
                        <a className='nav-link text-white'>r/Foods</a>
                    </li>
                    <li className='sideContent nav-item'>
                        <a className='nav-link text-white'>r/College</a>
                    </li>
                    <li className='sideContent nav-item'>
                        <a className='nav-link text-white'>r/Crochet</a>
                    </li>
                    <li className='sideContent nav-item'>
                        <a className='nav-link text-white'>r/Philippines</a>
                    </li>
                    <li className='sideContent nav-item'>
                        <a className='nav-link text-white'>r/DeadCells</a>
                    </li>
                    <hr></hr>
                    <li className='sideContent nav-item'>
                        <a className='nav-link text-white'>About Breaddit</a>
                    </li>
                    <li className='sideContent nav-item'>
                        <a className='nav-link text-white'>Help</a>
                    </li>
                    <li className='sideContent nav-item'>
                        <a className='nav-link text-white'>Settings</a>
                    </li>
                </ul>
            </div>
        </Col>
    )
}

export default Side;