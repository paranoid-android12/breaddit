import TopNav from './components/NavbarTop.js';
import Side from './components/SideBar.js';
import axios from 'axios';
import Post from './components/Post';
import Suggest from './components/SubredditSuggestion';
import {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Add this line
import { Link, useNavigate } from 'react-router-dom';
import {Col, Row, Image, Button, Container, Sidebar} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/postContentStyle.css';
import './styles/subreddit.css';

function PostContent({user, url}){
    let id = user.user_ID;
    const {subreddit} = useParams();
    const [post, setPost] = useState([]);
    const [subredditInfo, setSubredditInfo] = useState([]);
    const [profile, setProfile] = useState('');
    const [subscribed, setSubscribed] = useState();
    const navigate = useNavigate();
    let joinData = new FormData();

    //Fetch subreddit Data
    const subredditHook = () => {
        axios.get(url, {params: {'function': 'fetchSubredditSingle', 'name': subreddit}, withCredentials: true})
        .then(response => { 
            setSubredditInfo(response.data[0]);
        })
        .catch(error => alert(error.message));
    }
    useEffect(subredditHook, [subreddit])

    //Fetch subreddit Posts
    const postHook = () => {
        axios.get(url, {params: {'function': 'fetchSubredditPost', 'name': subreddit}, withCredentials: true})
        .then(response => { 
            setPost(response.data);
            setProfile(response.data[0][5]);
        })
        .catch(error => console.log(error.message));
    }
    useEffect(postHook, [subreddit])

    //Fetch instances of subscribtions
    const SubscribedFetch = () => {
        axios.get(url, {params: {'function': 'fetchSubscribed', 'id': user.user_ID, 'username': subreddit}, withCredentials: true})
        .then(response => {
            setSubscribed(response.data[0].is_subscribed);
        })
        .catch(error => console.log(error.message));
    }
    useEffect(SubscribedFetch, [subreddit])

    //Join subreddit function
    async function joinSubreddit(){
        console.log(user.user_ID);
        joinData.append('user_ID', user.user_ID);
        joinData.append('subreddit_ID', subredditInfo.subreddit_ID);
        await axios.post(url, joinData, {withCredentials: true})
        .then(response => {
            console.log(response.data);
        })
        .catch(error => console.log(error.message));
    }

    function JoinButton(){
        SubscribedFetch();
        if(subscribed == 0){
            joinData.append('function', 'joinSubreddit');
            return(
                <Button onClick={() => {joinSubreddit(); setSubscribed(1);}} className='joinSubreddit'>Join</Button>
            )
        }
        else{
            joinData.append('function', 'leaveSubreddit');
            return(
                <Button onClick={() => {joinSubreddit(); setSubscribed(0);}} className='joinSubreddit'>Leave</Button>
            )
        }
    }
    
    return(
        <div>
            <TopNav/>
            <div className='d-flex justify-content-center'>
                <div className='mainTimelineContainer'>
                    <Row className='absoluteRow'>
                        <Side/>
                        <Col className='d-flex row col-12 col-lg-10'>
                            <Row>
                                <div className='sb_halfCircleCont'>
                                    <div className='coverImageCont'>
                                        <img src={subredditInfo.subreddit_cover} className='coverImageActual'></img>
                                    </div>
                                    <div className='underCover d-flex'>
                                        <div className='d-flex'>
                                            <div className='circleHalfProfile'>
                                                <img className='circleHalfActual' src={subredditInfo.subreddit_picture}></img>
                                            </div>
                                            <h1 className='mainSubredditName text-sm'>r/{subreddit}</h1>
                                        </div>
                                        <JoinButton/>
                                    </div>
                                </div>
                                <Col className='mainStack col-12 col-lg-8'>
                                    <Row>
                                        <Button onClick={() => navigate('../timeline/forum')} className='sub_createButton'>Create Post</Button>
                                    </Row>
                                    <Post user={user} post={post} url={url}/>
                                </Col>
                                <Col className='suggestMainBox col-4 d-none d-lg-block'>
                                    <br></br>
                                    <div className='sub_sidebar'>
                                        <p className='sub_mainDesc'>{subreddit} - all about {subreddit}</p>
                                        <p className='sub_minDesc'>{subredditInfo.description}</p>
                                        {/* <div className='d-flex col justify-content-around'>
                                            <div>
                                                <p className='sub_count'>23412</p>
                                                <p className='sub_labelCount'>Subscribers</p>
                                            </div>
                                            <div>
                                                <p className='sub_count'>23412</p>
                                                <p className='sub_labelCount'>Subscribers</p>
                                            </div>
                                            <div>
                                                <p className='sub_count'>23412</p>
                                                <p className='sub_labelCount'>Subscribers</p>
                                            </div>
                                        </div> */}
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

export default PostContent;