import TopNav from './components/NavbarTop.js';
import Side from './components/SideBar.js';
import axios from 'axios';
import Post from './components/Post';
import Suggest from './components/SubredditSuggestion';
import {useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';  // Add this line
import {Col, Row, Image, Button, Container, Tabs, Tab} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/userStyle.css';


function User(){
    const {user} = useParams();
    const location = useLocation();
    const userData = location.state.userData;
    const url = 'http://localhost:8080/upwork_server/api/controller/tunnel.php'
    
    function UserPost(){
        const [post, setPost] = useState([]);
    
        const postHook = () => {
            axios.get(url, {params: {'function': 'fetchUserPost', 'user_ID': userData.user_ID}, withCredentials: true})
            .then(response => {
                console.log(response.data);
                setPost(response.data);
            });
        }
    
        useEffect(postHook, [user])
        return(
            <Post user={user} post={post}/>
        )
    }


        
    function CommentBlock({comment}){
        return(
            <Container>
                <div className='usercom_mainCont d-flex col'>
                    <div className='usercom_subredditImageCont'>
                        <img className='usercom_subredditImage' src={comment.subreddit_picture}></img>
                    </div>
                    <p className='usercom_subredditName'>r/{comment.subreddit_name}</p>
                    <p className='usercom_commentPostTitle'>{comment.post_title}</p>
                </div>
                <div className='d-flex col'>
                    <p className='usercom_userPoster'>{user}</p>
                    <p className='usercom_repliedto'>commented to</p>
                    <p className='usercom_userFrom'>{comment.post_owner_username}</p>
                    <p className='usercom_repliedto'>'s post</p>
                </div>
                <p className='usercom_mainContent'>{comment.content}</p>
                <hr></hr>
            </Container>
        )
    }



    function CommentIter(){
        const [comment, setComment] = useState([]);

        const commentHook = () => {
            axios.get(url, {params: {'function': 'fetchUserComment', 'user_ID': userData.user_ID}, withCredentials: true})
            .then(response => {
                console.log(response.data);
                setComment(response.data);
            });
        }
    
        useEffect(commentHook, [user])

        try {
            return(
                comment.map((x, index) => (
                    <CommentBlock comment={x}/>
                ))
            );
        } catch (error) {
            
        }
    }


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
                                    <div className='user_profileMainCont'>
                                        <div className='user_profileCont'>
                                            <img></img>
                                        </div>
                                        <div>
                                            <h1 className='user_bigUsername'>{userData.username}</h1>
                                            <p className='user_smallUsername'>r/{userData.username}</p>
                                        </div>
                                    </div>
                                    <br></br>
                                    <Tabs
                                    defaultActiveKey="posts"
                                    id="uncontrolled-tab-example"
                                    className="tab-underline-remove mb-3"
                                    >
                                        <Tab eventKey="posts" title="Posts">
                                            <hr></hr>
                                            <UserPost/>
                                        </Tab>
                                        <Tab eventKey="comments" title="Comments">
                                            <hr></hr>
                                            <CommentIter/>
                                        </Tab>
                                        <Tab eventKey="upvoted" title="Upvoted">
                                            <hr></hr>
                                            Tab content for Contact
                                        </Tab>
                                    </Tabs>

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

export default User;