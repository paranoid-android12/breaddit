import {Col, Row, Image, Button, Container} from 'react-bootstrap';
import TopNav from './components/NavbarTop';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/landingStyle.css';

function Landing(){
    return(
    <div>
         {/* Top Navbar */}
        <TopNav />
        
        <Container>
            <Row>
                <Col lg={7} xs={12}>
                    <h1 className="mainWordTitle">How work<br/>should work</h1>
                    <p className='underMainWordTitle'>Forget the old rules. You can have the best people.<br/>Right now. Right here.</p>
                    <Button className='getStartedButton' href='./Forum.js'>Get Started</Button>
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
