import TopNav from './components/NavbarTop.js';
import Side from './components/SideBar.js';
import axios from 'axios';
import Post from './components/Post';
import Suggest from './components/SubredditSuggestion';
import {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Add this line
import {Col, Row, Image, Button, Container, Sidebar} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/postContentStyle.css';
import './styles/subreddit.css';


function PostContent(){

    const {subreddit} = useParams();
    const url = 'http://localhost:8080/upwork_server/api/tunnel.php'
    const [post, setPost] = useState([]);
    const [profile, setProfile] = useState('');
    console.log("Subreddit Name: ", subreddit);

    const postHook = () => {
        axios.get(url, {params: {'function': 'fetchSubredditPost', 'name': subreddit}})
        .then(response => {
            setPost(response.data);
            setProfile(response.data[0][5]);
        });
    }

    useEffect(postHook, [subreddit])

    return(
        <div>
            <TopNav/>
            <Container>
                <Row>
                    <Side/>
                    <Col className=' flex-row col-12 col-lg-10'>
                        <Row>
                            <Col className='mainStack col-12 col-lg-8'>
                                <br></br>
                                <div className='halfCircleCont'>
                                    <div className='coverImageCont'>
                                        <img className='coverImageActual'></img>
                                    </div>
                                    <div className='underCover d-flex'>
                                        <div className='d-flex'>
                                            <div className='circleHalfProfile'>
                                                <img className='circleHalfActual' src={profile}></img>
                                            </div>
                                            <h1 className='mainSubredditName text-sm'>r/{subreddit}</h1>
                                        </div>
                                        <Button className='joinSubreddit'>Join</Button>
                                    </div>
                                </div>
                                <Post post={post}/>
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