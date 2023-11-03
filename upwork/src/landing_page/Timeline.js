import { Stack } from 'react-bootstrap';
import TopNav from './components/NavbarTop';
import {Col, Row, Image, Button, Container, Sidebar} from 'react-bootstrap';
import Post from './components/Post';
import axios from 'axios';
import './styles/postStyle.css';
import { Component, useEffect, useState } from 'react';

function Timeline(){
    const url = 'http://localhost:8080/upwork_server/connection.php'
    const [post, setPost] = useState([]);


    const hook = () => {
        axios.get(url)
        .then(response => setPost(response.data));
    }
      
    useEffect(hook, [])


    return(
        <div>
            <TopNav />
            <Container>
                <Row>
                    <Col className='sideBar col-2 d-none d-md-block'>
                        <br></br>
                        <ul className='nav nav-pills flex-column mb-auto'>
                            <li className='sideContent nav-item'>
                                <a className='nav-link text-white'>Home</a>
                            </li>
                            <li className='sideContent nav-item'>
                                <a className='nav-link text-white'>Popular</a>
                            </li>
                        </ul>
                    </Col>

                    <Col className='timelineCont flex-row col-10'>
                        <br></br>
                        <div className="overflow-container">
                            <Row className="d-flex flex-nowrap overflow-auto">
                                <div className="imageRow mx-2">Image 1</div>
                                <div className="imageRow mx-2">Image 2</div>
                                <div className="imageRow mx-2">Image 3</div>
                                <div className="imageRow mx-2">Image 4</div>
                                <div className="imageRow mx-2">Image 5</div>
                                <div className="imageRow mx-2">Image 6</div>
                                <div className="imageRow mx-2">Image 7</div>
                            </Row>
                        </div>
                        <Row>
                            <Col className='col-8'>
                                <br></br>
                                <Container className='createPost'>
                                    <Row>
                                        <div className='createButton'>Create Post</div>
                                    </Row>
                                </Container>
                                <br></br>
                                <Post post={post}/>
                            </Col>
                            <Col className='col-4'>
                                <br></br>
                                <Container className='suggestCommunities'>
                                    <h2>POPULAR COMMUNITIES</h2>
                                </Container>
                            </Col>
                        </Row>
                    </Col>

                </Row>

            </Container>

        </div>
    )
}

export default Timeline;