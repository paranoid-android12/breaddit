import {Col, Row, Image, Button, Container} from 'react-bootstrap';
import { Routes, Route, useNavigate } from 'react-router-dom';
import TopNav from './components/NavbarTop';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/landingStyle.css';


function Landing(){
    const navigate = useNavigate();
    return(
    <div>
        <Container>
            <Row>
                <Col lg={7} xs={12}>
                    <h1 className="mainWordTitle">Post some<br/>stuffs!</h1>
                    <p className='underMainWordTitle'>Forget the old rules. You can have the best people.<br/>Right now. Right here.</p>
                    <Button className='getStartedButton' onClick={() => navigate('../Login')}>Get Started</Button>
                </Col>
                <Col lg={5} xs={0} className="d-none d-lg-block">
                    <Image src='./landing_page_assets/moyai.png' fluid className='moyaiImage'/>
                </Col>
            </Row>
        </Container>
    </div>
    )
}

export default Landing;
