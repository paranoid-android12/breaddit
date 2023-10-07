import { Stack } from 'react-bootstrap';
import TopNav from './components/NavbarTop';
import {Col, Row, Image, Button, Container} from 'react-bootstrap';
import Post from './components/Post';
import axios from 'axios';
import './styles/postStyle.css';
import { Component, useEffect, useState } from 'react';

function Timeline(){
    // const url = 'https://wafflesaucer.alwaysdata.net'
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
            <Stack>
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

        </div>
    )
}

export default Timeline;