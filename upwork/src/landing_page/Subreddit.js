import TopNav from './components/NavbarTop.js';
import Side from './components/SideBar.js';
import Suggest from './components/SubredditSuggestion.js';
import {Col, Row, Image, Button, Container, Sidebar} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/postContentStyle.css';
import './styles/subreddit.css';


function PostContent(){
    return(
        <div>
            <TopNav/>
            <Container>
                <Row>
                    <Side/>
                    <Col className=' flex-row col-12 col-lg-10'>
                        <Row>
                            <Col className='mainStack col-12'>
                                <br></br>
                                <div className='coverImageCont'>
                                    <img></img>
                                </div>
                                <Container>
                                    <Row>
                                    </Row>
                                </Container>
                                <br></br>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PostContent;