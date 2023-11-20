import { Stack } from 'react-bootstrap';
import TopNav from './components/NavbarTop';
import {Col, Row, Image, Button, Container, Sidebar} from 'react-bootstrap';
import Post from './components/Post';
import Suggest from './components/SubredditSuggestion';
import ImageCard from './components/ImageCarousel';
import axios from 'axios';
import './styles/postStyle.css';
import { Component, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Timeline(){
    const navigate = useNavigate();
    // if(document.cookie == ''){
    //     navigate('../Login.js')
    // }
    const url = 'http://localhost:8080/upwork_server/root.php'
    const [post, setPost] = useState([]);

    const postHook = () => {
        axios.get(url, {params: {'function': 'fetchPost'}})
        .then(response => {
            setPost(response.data);
        });
    }
      
    useEffect(postHook, [])

    return(
        <div>
            <TopNav/>
            <Container>
                <Row>
                    <Col className='sideBar col-2 d-none d-lg-block'>
                        <div className='sideBarStick'>
                            <br></br>
                            <ul className='nav nav-pills flex-column mb-auto'>
                                <li className='sideContent nav-item'>
                                    <a className='nav-link text-white'>Home</a>
                                </li>
                                <li className='sideContent nav-item'>
                                    <a className='nav-link text-white'>Popular</a>
                                </li>
                                <hr></hr>
                                <li className='sideContent nav-item'>
                                    <a className='nav-link text-white'>r/Gaming</a>
                                </li>
                                <li className='sideContent nav-item'>
                                    <a className='nav-link text-white'>r/Foods</a>
                                </li>
                                <li className='sideContent nav-item'>
                                    <a className='nav-link text-white'>r/College</a>
                                </li>
                                <li className='sideContent nav-item'>
                                    <a className='nav-link text-white'>r/Crochet</a>
                                </li>
                                <li className='sideContent nav-item'>
                                    <a className='nav-link text-white'>r/Philippines</a>
                                </li>
                                <li className='sideContent nav-item'>
                                    <a className='nav-link text-white'>r/DeadCells</a>
                                </li>
                                <hr></hr>
                                <li className='sideContent nav-item'>
                                    <a className='nav-link text-white'>About Breaddit</a>
                                </li>
                                <li className='sideContent nav-item'>
                                    <a className='nav-link text-white'>Help</a>
                                </li>
                                <li className='sideContent nav-item'>
                                    <a className='nav-link text-white'>Settings</a>
                                </li>
                            </ul>

                        </div>
                    </Col>

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
                                        <Link className='createButton' to='../Forum.js'>Create Post</Link>
                                    </Row>
                                </Container>
                                <br></br>
                                <Post post={post}/>
                            </Col>
                            <Col className='suggestMainBox col-4 d-none d-lg-block'>
                                <br></br>
                                <Container className='suggestCommunities'>
                                    <br></br>
                                    <h2 className='popularCommunities'>POPULAR COMMUNITIES</h2>
                                    <Suggest/>
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