import {Col} from 'react-bootstrap';
import '../styles/postStyle.css';

function Side(){
    return(
        <Col className='sideBar col-2 d-none d-lg-block'>
            <div className='sideBarStick'>
                <br></br>
                <ul className='nav nav-pills flex-column mb-auto'>
                    <li className='sideContent nav-item'>
                        <a className='nav-link text-white'>Home</a>
                    </li>
                    <li className='sideContent nav-item'>
                        <a className='nav-link text-white'>Popular</a>
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