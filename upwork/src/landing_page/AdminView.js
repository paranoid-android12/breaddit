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


function Timeline({user, post, url}){
    const navigate = useNavigate();

    return(
        <div>
            <TopNav/>
            <div className='d-flex justify-content-center'>
                <div className='mainTimelineContainer'>
                    <Row className='absoluteRow'>
                        <Side/>
                        <Col className='timelineCont flex-row col-12 col-lg-10'>
                            <br></br>
                            <div className="overflow-container">
                                <ImageCard/>
                            </div>
                            <Row>
                                <Col className='timelinePostCont col-9'>
                                    <br></br>
                                    <Container>
                                        <Row>
                                            <Link className='createButton' to='../timeline/forum'>Create Post</Link>
                                        </Row>
                                    </Container>
                                    <br></br>
                                    <Post user={user} post={post} url={url}/>
                                </Col>
                                <Col className='suggestMainBox col-3 d-none d-lg-block'>
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

export default Timeline;