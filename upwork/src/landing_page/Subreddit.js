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


function PostContent({user}){

    const {subreddit} = useParams();
    const url = 'http://localhost:8080/upwork_server/api/controller/tunnel.php'
    const [post, setPost] = useState([]);
    const [profile, setProfile] = useState('');

    const postHook = () => {
        axios.get(url, {params: {'function': 'fetchSubredditPost', 'name': subreddit}, withCredentials: true})
        .then(response => {
            console.log(response.data);
            setPost(response.data);
            setProfile(response.data[0][5]);
        });
    }

    useEffect(postHook, [subreddit])

    return(
        <div>
            <TopNav/>
            <div className='d-flex justify-content-center'>
                <div className='mainTimelineContainer'>
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
                                    <Post user={user} post={post}/>
                                </Col>
                                <Col className='suggestMainBox col-4 d-none d-lg-block'>
                                    <br></br>
                                    <Suggest/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default PostContent;