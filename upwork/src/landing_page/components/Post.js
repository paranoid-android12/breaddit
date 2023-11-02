import {Container} from 'react-bootstrap';
import * as React from "react";
import '../styles/postStyle.css';

function PostBlock({username, title, content, date}){
    console.log({username});
    return(
        <Container className='postBorder'>
            <p class='userInfoPost'>Posted by u/{username} {date}</p>
            <h1 class='titlePost'>{title}</h1>
            <p class='contentPost'>{content}</p>
            <Container className='d-flex flex-row'>
                <div className='statPill'>Upv</div>
                <div className='statPill'>Upv</div>
                <div className='statPill'>Upv</div>
            </Container>
        </Container>
    )
}


function Post({ post }) {
    return (
            post.map((x, index) => (
                <PostBlock key={x[0]} username={x[1]} title={x[2]} content={x[3]} date={x[4]} />
            ))
    );
}

export default Post;