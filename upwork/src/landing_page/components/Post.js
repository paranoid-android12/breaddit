import {Container} from 'react-bootstrap';
import * as React from "react";
import '../styles/postStyle.css';

function PostBlock({username, title, content, date}){
    console.log({username});
    return(
        <Container className='postBorder'>
            <p style={{opacity: '50%'}}>Posted by u/{username} {date}</p>
            <h1>{title}</h1>
            <p>{content}</p>
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