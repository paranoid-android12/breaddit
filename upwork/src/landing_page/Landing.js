import {Nav, Navbar, NavDropdown, Col, Row, Image, Button, Container} from 'react-bootstrap';
import TopNav from './components/NavbarTop';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/landingStyle.css';

function Landing(){
    return(
    <div>
         {/* Top Navbar */}
        <TopNav />

        {/* Sub Navbar */}
        <Navbar expand="lg" className='subNav'>
            <Container className='topNav'>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link className='text-light' href='/Forum.js'>Forum</Nav.Link>
                <Nav.Link className='text-light' href='/Timeline.js'>Timeline</Nav.Link>
                {/* <Link to='/Forum.js'>Forum</Link> */}
                    {/* 
                    
                    
                    <NavDropdown title="More" id="basic-nav-dropdown" ></NavDropdown> */}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>



        {/* How work should work init frame */}
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



        {/* <Container>
            <h1>Browse talent by category</h1>
            <p>Looking for work? Browse jobs</p>
            <Row xs={1} sm={2} lg={4} className="mt-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>AI Services</Card.Title>
                            <Card.Text style={{ marginRight: '10px' }}>RATINGS</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>AI Services</Card.Title>
                            <Card.Text style={{ marginRight: '10px' }}>RATINGS</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>AI Services</Card.Title>
                            <Card.Text style={{ marginRight: '10px' }}>RATINGS</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>AI Services</Card.Title>
                            <Card.Text style={{ marginRight: '10px' }}>RATINGS</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container> */}
    </div>
    )
}

export default Landing;
