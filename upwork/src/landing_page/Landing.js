import {Col, Row, Image, Button, Container} from 'react-bootstrap';
import { Routes, Route, useNavigate } from 'react-router-dom';
import TopNav from './components/NavbarTop';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/landingStyle.css';


function Landing(){
    const navigate = useNavigate();
    return(
    <div className='land_main'>

        <div className='land_nav d-flex col align-items-center justify-content-between'>
            <div className='d-flex col align-items-center'>
                {/* <div className='land_logoCont'>
                    <img className='land_logo' src='http://localhost:8080/upwork_server/breaddit_assets/landing_page_assets/bread.png'></img>
                </div> */}
                <h1 className='land_title'>                    
                    <span style={{ color: 'white' }}>Breadd</span>
                    <span style={{ color: 'rgb(255, 83, 20)' }}>it</span>
                </h1>
            </div>


            <h2 className='land_reg'>Login</h2>
            <h2 className='land_reg'>Register</h2>

        </div>
        <div className='land_mid d-flex col align-items-center justify-content-around'>
            <div>
                <h1 className='land_tag'>
                    <span style={{ color: 'white' }}>The </span>
                    <span style={{ color: 'rgb(255, 83, 20)' }}>front page</span>
                </h1>
                <h1 className='land_tag'>of the internet.</h1>
            </div>
            <div className='land_logoCont'>
                    <img onClick={() => navigate('./login')} className='land_logo' src='http://localhost:8080/upwork_server/breaddit_assets/landing_page_assets/bread.png'></img>
            </div>
        </div>
    </div>
    )
}

export default Landing;
