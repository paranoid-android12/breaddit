import TopNav from './components/NavbarTop.js';
import Side from './components/SideBar.js';
import Suggest from './components/SubredditSuggestion.js';
import {Col, Row, Image, Button, Container, Sidebar} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/postContentStyle.css';


function PostContent(){
    return(
        <div>
            <TopNav/>
            <Container>
                <Row>
                    <Side/>
                    <Col className='timelineCont flex-row col-12 col-lg-10'>
                        <br></br>
                        <div className="overflow-container">
                        </div>
                        <Row>
                            <Col className='col-12 col-lg-8'>
                                <br></br>
                                <Container>
                                    <Row>
                                    </Row>
                                </Container>
                                <br></br>
                            </Col>
                            <Col className='suggestMainBox col-4 d-none d-lg-block'>
                                <br></br>
                                <Suggest/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PostContent;