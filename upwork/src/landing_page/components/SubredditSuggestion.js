import {Container, Row} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {useEffect, useState } from 'react';
import axios from 'axios';
import * as React from "react";
import '../styles/postStyle.css';

function SuggestIter({name, uploads, src}){
    let url = '../timeline/r/' + name;
    return(
        <Link to={url}  style={{color: 'inherit', textDecoration: 'inherit' }}>
            <Container className='suggestionBox'>
                <div className='imageCircle'>
                    <img className='imageMain' src={src}></img>
                </div>
                <Row>
                    <p className='subredditName'>r/{name}</p>
                    <p className='postCount'>{uploads} Uploads</p>
                </Row>
            </Container>
            <br></br>
        </Link>
    )
}

function SubIterate({subreddit}){
    return(
        subreddit.map((x, index) => (
            <SuggestIter key={x[0]} name={x[1]} uploads={26} src={x[5]}/>
        ))
    );
}

function Suggest() {
    const navigate = useNavigate();
    const [subreddit, setSubreddit] = useState([]);
    const url = 'http://localhost:8080/upwork_server/api/controller/tunnel.php'

    const postHook = () => {
        axios.get(url, {params: {'function': 'fetchSubreddit'}})
        .then(response => {
            setSubreddit(response.data);
        });
    }
      
    useEffect(postHook, [])

    return (
        <Container className='suggestCommunities'>
            <br></br>
            <h2 className='popularCommunities'>POPULAR COMMUNITIES</h2>
            <Row>
                <SubIterate subreddit={subreddit}/>
            </Row>
        </Container>
    );
}

export default Suggest;