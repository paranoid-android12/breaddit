import {Container, Row} from 'react-bootstrap';
import {useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as React from "react";
import '../styles/postStyle.css';

function SuggestIter({id, name, uploads, src}){
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
            <SuggestIter id={x[0]} name={x[1]} uploads={26} src={x[5]}/>
        ))
    );
}

function Suggest() {
    const [subreddit, setSubreddit] = useState([]);
    const url = 'http://localhost:8080/upwork_server/api/tunnel.php'

    const postHook = () => {
        axios.get(url, {params: {'function': 'fetchSubreddit'}})
        .then(response => {
            console.log(response.data)
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
                {/* <SuggestIter name={'r/DeadCells'} uploads={'25'} src={'/subreaddit_image_assets/dead_cells.png'}/>
                <SuggestIter name={'r/Crochet'} uploads={'76'} src={'/subreaddit_image_assets/crochet.png'}/>
                <SuggestIter name={'r/Gaming'} uploads={'56'} src={'/subreaddit_image_assets/gaming.png'}/>
                <SuggestIter name={'r/Anime'} uploads={'25'} src={'/subreaddit_image_assets/anime.jpg'}/>
                <SuggestIter name={'r/Java'} uploads={'25'} src={'/subreaddit_image_assets/java.png'}/> */}
            </Row>
        </Container>
    );
}

export default Suggest;