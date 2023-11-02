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
            <Container className='d-flex flex-row'>
                <Container style={{width: '280px'}}>
                    <ul className=' nav nav-pills flex-column mb-auto'>
                        <li className='sideContent nav-item'>
                            <a className='nav-link text-white'>Home</a>
                        </li>
                        <li className='sideContent nav-item'>
                            <a className='nav-link text-white'>Popular</a>
                        </li>
                    </ul>
                </Container>

                <Container className='flex-row'>
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
                            <Stack className='stackCont'>
                                <Container className='filter'>
                                    <Row>
                                        <Col className='filButton'>Best</Col>
                                        <Col className='filButton'>Hot</Col>
                                        <Col className='filButton'>New</Col>
                                        <Col className='filButton'>Top</Col>
                                    </Row>
                                </Container>
                                <Post post={post}/>
                            </Stack>
                        </Col>
                        <Col className='col'>
                            <div className='suggestCommunities'>
                                asdf
                            </div>
                        </Col>
                    </Row>
                </Container>

            </Container>

        </div>
    )
}

export default Timeline;