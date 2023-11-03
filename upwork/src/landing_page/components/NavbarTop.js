import {Nav, Navbar, NavDropdown, Container, Row, Col} from 'react-bootstrap';

function TopNav(){
    return(
        <div>
            <Navbar expand="lg" className='mainNav'>
                <Container className='container-fluid'>
                    <Navbar.Brand href="./" className='titleNav'>Breaddit</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {/* <Navbar.Collapse id="basic-navbar-nav"> */}
                    <form className='searchForm d-flex'>
                        <input className="searchBar" type="search" placeholder='Search Breaddit'></input>
                    </form>
                    {/* </Navbar.Collapse> */}
                </Container>
            </Navbar>
            {/* <Navbar expand="lg" className='subNav'>
                <Container className='topNav'>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className='text-light' href='/Forum.js'>Forum</Nav.Link>
                        <Nav.Link className='text-light' href='/Timeline.js'>Timeline</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}
        </div>

    )
}

export default TopNav;