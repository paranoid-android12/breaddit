import {Nav, Navbar, NavDropdown, Container} from 'react-bootstrap';

function TopNav(){
    return(
        <Navbar expand="lg" className='mainNav'>
            <Container className='topNav'>
                <Navbar.Brand href="./" className='titleNav'>Upwork</Navbar.Brand>
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
    )
}

export default TopNav;