import {useEffect, useState } from 'react';
import {Container, Row} from 'react-bootstrap';
import axios from 'axios';
import '../styles/commentStyle.css';

function CommentBlock({comment}){
    return(
        <Container>
            <p className='com_username'>u/{comment[6]}</p>
            <p className='com_content'>{comment[3]}</p>
            <div className='com_statPillVote'>
                <div className='com_voteCont'>
                    <img className='com_upvoteImage' src='/timeline_assets/arrowup.png'></img>
                </div>
                <p className='com_voteCountDisplay'>12</p>
                <div className='com_downvoteCont'>
                    <img className='com_downvoteImage' src='/timeline_assets/arrowdown.png'></img>
                </div>
            </div>
            <br></br>
        </Container>
    )
}

function Comments({id}){
    const url = 'http://localhost:8080/upwork_server/api/controller/tunnel.php'
    const [post, setPost] = useState([]);

    const postHook = () => {
        axios.get(url, {params: {'function': 'fetchComment', 'post_ID': id}})
        .then(response => {
            console.log(response.data);
            setPost(response.data);
        });
    }
      
    useEffect(postHook, [])

    return (
        post.map((x, index) => (
            <CommentBlock key={x[0]} comment={x}/>
        ))
);
}

export default Comments;