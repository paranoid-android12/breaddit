import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "bootstrap/dist/css/bootstrap.min.css";
import './components/landingStyle.css';

function App(){
    return(
    <div>
        <Navbar expand="lg" className='mainNav'>
            <Container>
                <Navbar.Brand href="#home" className='text-light'>Upwork</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title="Find Talent" id="basic-nav-dropdown" ></NavDropdown>
                    <NavDropdown title="Find Work" id="basic-nav-dropdown" ></NavDropdown>
                    <NavDropdown title="Why Upwork" id="basic-nav-dropdown" ></NavDropdown>
                    <Nav.Link className='text-light'>Enterprise</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Container>
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
        </Container>
    </div>
    )
}

export default App;
