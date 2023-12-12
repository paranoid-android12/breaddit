import TopNav from './components/NavbarTop';
import Post from './components/Post';
import Suggest from './components/SubredditSuggestion';
import ImageCard from './components/ImageCarousel';
import Side from './components/SideBar';

import {Col, Row, Image, Button, Container, Alert} from 'react-bootstrap';
import {useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/postStyle.css';
import Login from './Login.js';


function Search({user, url}){
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    let {search} = useParams();

    console.log(user.user_ID);

    const GetSearch = () => {
        axios.get(url, {params: {'function': 'fetchSearch', 'param': search, 'id': user.user_ID}, withCredentials: true})
        .then(response => {
            console.log(response.data);
            setPost(response.data);
        })
        .catch(error => alert(error.message));
    }

    useEffect(GetSearch, []);



    return(
        <div>
            <TopNav/>
            <div className='d-flex justify-content-center'>
                <div className='mainTimelineContainer'>
                    <Row className='absoluteRow'>
                        <Col className='timelineCont flex-row'>
                            <br></br>
                            <Row className='d-flex justify-content-center'>
                                <Col className='timelinePostCont col-10'>
                                    <h1>Search Results for "{search}"</h1>
                                    <br></br>
                                    <Post user={user} post={post} url={url}/>
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Search;