import {Container, Row} from 'react-bootstrap';
import * as React from "react";
import '../styles/postStyle.css';

function PostBlock({username, title, content, date, type}){
    console.log({username});
    if(type==0){
        return(
            <div>
                <Container className='postBorder'>
                    <div className='postMargin'>
                        <p class='userInfoPost'>Posted by u/{username} {date}</p>
                        <h1 class='titlePost'>{title}</h1>
                        <p class='contentPost'>{content}</p>
                        <Container className='d-flex flex-row' style={{padding: '0px'}}>
                            <div className='statPill'></div>
                            <div className='statPill'></div>
                        </Container>
                    </div>
                </Container>
                <hr></hr>
            </div>
        )
    }
    else{
        return(
            <div>
                <Container className='postBorder'>
                    <div className='postMargin'>
                        <p className='userInfoPost'>Posted by u/{username} {date}</p>
                        <h1 className='titlePost'>{title}</h1>
                        <img src={content} className='contentImage'></img>
                        <Container className='d-flex flex-row' style={{padding: '0px'}}>
                            <div className='statPill'></div>
                            <div className='statPill'></div>
                        </Container>
                    </div>
                </Container>
                <hr></hr>
            </div>
        )
    }
}


function Post({ post }) {
    return (
            post.map((x, index) => (
                <PostBlock key={x[0]} username={x[1]} title={x[2]} content={x[3]} date={x[4]} type={x[5]}/>
            ))
    );
}

export default Post;