import TopNav from './components/NavbarTop';
import Post from './components/Post';
import Suggest from './components/SubredditSuggestion';
import ImageCard from './components/ImageCarousel';
import Side from './components/SideBar';

import {Col, Row, Image, Button, Container, Sidebar} from 'react-bootstrap';
import {useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/postStyle.css';
import Login from './Login.js';


function Timeline({user, post}){
    const navigate = useNavigate();
    return(
        <div>
            <TopNav user={user}/>
            <Container className='absoluteTimelineContainer'>
                <Row>
                    <Side/>
                    <Col className='timelineCont flex-row col-12 col-lg-10'>
                        <br></br>
                        <div className="overflow-container">
                            <ImageCard/>
                        </div>
                        <Row>
                            <Col className='col-12 col-lg-8'>
                                <br></br>
                                <Container>
                                    <Row>
                                        <Link className='createButton' to='../timeline/forum'>Create Post</Link>
                                    </Row>
                                </Container>
                                <br></br>
                                <Post user={user} post={post}/>
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

export default Timeline;