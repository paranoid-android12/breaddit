import TopNav from './components/NavbarTop';
import Post from './components/Post';
import Suggest from './components/SubredditSuggestion';
import ImageCard from './components/ImageCarousel';
import Side from './components/SideBar';


import {Col, Row, Image, Button, Container, Alert} from 'react-bootstrap';
import {useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/postStyle.css';
import Login from './Login.js';


function AdminView({user, post, url}){
    const navigate = useNavigate();
    if(user.user_ID != 4){
        navigate('../timeline');
        alert("You don't have the admin privileges.");
    }


    function FollowBlock({follow}){
        const userUrl = '../timeline/u/' + follow.username;
        if(follow.username != 'admin_wizard'){
            return(
                <div className='follow_border d-flex col align-items-center'>
                    <div className='follow_profileBorder'>
                        <img src='http://localhost:8080/upwork_server/breaddit_assets/user_profileimage/MichaelRibs.png' className='follow_profile'></img>
                    </div>
                    <div className='d-flex row'>
                        <p className='follow_username' onClick={() => navigate(userUrl)}>{follow.username}</p>
                        <p className='follow_karma'>Karma: {follow.karma}</p>
                    </div>
                </div>
            )
        }
    }

    function FollowIter(){
        const [follow, setFollow] = useState([]);

        const followHook = () => {
            axios.get(url, {params: {'function': 'fetchUsers'}, withCredentials: true})
            .then(response => {
                console.log(response.data);
                setFollow(response.data);
            })
            .catch(error => console.log(error.message));
        }

        useEffect(followHook, [])


        try {
            return(
                follow.map((x, index) => (
                    <FollowBlock key={x[0]} follow={x}/>
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
                    <Row className='absoluteRow'>
                        <Side/>
                        <Col className='timelineCont flex-row col-12 col-lg-10'>
                            <br></br>
                            <FollowIter/>
                            {/* <Row>
                                <Col className='timelinePostCont col-12'>
                                    <br></br>
                                    <Container>
                                        <Row>
                                            <Link className='createButton' to='../timeline/forum'>Create Post</Link>
                                        </Row>
                                    </Container>
                                    <br></br>
                                    <Post user={user} post={post} url={url}/>
                                </Col>

                            </Row> */}
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default AdminView;