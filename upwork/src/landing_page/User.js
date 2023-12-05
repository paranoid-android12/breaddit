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
    const [uniqUser, setUniqUser] = useState([]);
    
    //Fetch user data
    const uniqHook = () => {
        axios.get(url, {params: {'function': 'fetchUniqueUser', 'username': user}, withCredentials: true})
        .then(response => {
            console.log(response.data[0]);
            setUniqUser(response.data[0]);
        });
    }

    useEffect(uniqHook, [user])

    //Fetch post of user
    function UserPost(){
        const [post, setPost] = useState([]);
    
        const postHook = () => {
            axios.get(url, {params: {'function': 'fetchUserPost', 'user_ID': userData.user_ID, 'username': uniqUser.username}, withCredentials: true})
            .then(response => {
                setPost(response.data);
            });
        }
    
        useEffect(postHook, [user])
        return(
            <Post user={userData} post={post}/>
        )
    }
 
    //Fetch comment of user
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
                    <p className='usercom_userPoster'>{uniqUser.username}</p>
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
            axios.get(url, {params: {'function': 'fetchUserComment', 'username': uniqUser.username}, withCredentials: true})
            .then(response => {
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

    //Fetch upvoted post of user
    function UpvotedPost(){
        const [upPost, setUpPost] = useState([]);
        console.log(userData.user_ID, uniqUser.username)
    
        const uppostHook = () => {
            axios.get(url, {params: {'function': 'fetchUserUpvote', 'user_ID': userData.user_ID, 'username': uniqUser.username}, withCredentials: true})
            .then(response => {
                console.log(response.data);
                setUpPost(response.data);
            });
        }
    
        useEffect(uppostHook, [uniqUser.username, user])
        return(
            <Post user={userData} post={upPost}/>
        )
    }

    function SubComp({sub}){
        return(
            <div>
                <div className='ss_border'>
                    <div className='d-flex col align-items-center'>
                        <div className='ss_imageCont'>
                            <img className='ss_image' src={sub.subreddit_picture}></img>
                        </div>
                        <div>
                            <h3 className='ss_subName'>r/{sub.name}</h3>
                            <p className='ss_subMemberCount'>12 Members</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function SubredditSubscribed(){
        const [subscribedSub, setSubscribedSub] = useState([]);
    
        const subHook = () => {
            axios.get(url, {params: {'function': 'fetchUserSubscription', 'user_ID': uniqUser.user_ID}, withCredentials: true})
            .then(response => {
                console.log(response.data);
                setSubscribedSub(response.data);
            });
        }
    
        useEffect(subHook, [user])
    
        try {
            return (
                subscribedSub.map((x, index) => (
                    <SubComp sub={x}/>
                ))
            );
        } catch (error) {
            console.log(error);
        }
    }


    return(
        <div>
            <TopNav/>
            <div className='d-flex justify-content-center'>
                <div className='mainTimelineContainer'>
                    <Row className='d-flex col'>
                        <Side/>
                        <Col className='col-12 col-lg-10'>
                            <Row>
                                <Col className='user_timelineLeftCont col-8'>
                                    <br></br>
                                    <div className='user_profileMainCont'>
                                        <div className='user_profileCont'>
                                            <img src={uniqUser.profile_image}></img>
                                        </div>
                                        <div>
                                            <h1 className='user_bigUsername'>{uniqUser.username}</h1>
                                            <p className='user_smallUsername'>r/{uniqUser.username}</p>
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
                                            <UpvotedPost/>
                                        </Tab>
                                    </Tabs>

                                </Col>
                                <Col className='suggestMainBox col-4 d-none d-lg-block'>
                                    <br></br>
                                    <div className='user_sideBar'>
                                        <div className='user_inviBorder'>
                                            <div className='user_upperBar'>
                                                <p className='user_mainUsername'>{uniqUser.username}</p>
                                            </div>
                                            <div className='user_followBar'>
                                                <div className='user_followButton'>
                                                    <img className='user_followPlus' src='/timeline_assets/plus.png'></img>
                                                    <p className='user_followText'>Follow</p>
                                                </div>
                                            </div>
                                            <hr style={{opacity: '15%'}}></hr>
                                            <div className='d-flex col justify-content-around'>
                                                <div>
                                                    <p className='user_count'> 1231</p>
                                                    <p className='user_label'>Post Karma</p>
                                                </div>

                                                <div>
                                                    <p className='user_count'> 1231</p>
                                                    <p className='user_label'>Cake Day</p>
                                                </div>
                                            </div>
                                            <hr style={{opacity: '15%'}}></hr>
                                            <p style={{opacity: '50%', fontFamily: 'sans-serif'}}>SUBREDDIT SUBSCRIPTIONS</p>
                                            <SubredditSubscribed/>
                                        </div>
                                    </div>
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