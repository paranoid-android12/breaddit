import {Container, Row} from 'react-bootstrap';
import * as React from "react";
import '../styles/postStyle.css';


function Content({content, type}){
    if(type == 0){
        return(
            <div>
                <p class='contentPost'>{content}</p>
            </div>
        )
    }
    else{
        return(
            <div>
                <div className='contentImageContainer'>
                    <img src={content} className='contentImage'></img>
                </div>
                <br></br><br></br>
            </div>
        )
    }
}

function PostBlock({username, title, content, date, type}){
    return(
        <div>
            <Container className='postBorder'>
                <div className='postMargin'>
                    <p class='userInfoPost'>Posted by u/{username} {date}</p>
                    <h1 class='titlePost'>{title}</h1>
                    {/* <p class='contentPost'>{content}</p> */}
                    <Content content={content} type={type}/>
                    <Container className='d-flex flex-row' style={{padding: '0px'}}>
                        <div className='statPillVote'>
                            <div className='voteCont'>
                                <img className='upvoteImage' src='./timeline_assets/arrowup.png'></img>
                            </div>
                            <p className='voteCountDisplay'>12</p>
                            <div className='downvoteCont'>
                                <img className='downvoteImage' src='./timeline_assets/arrowdown.png'></img>
                            </div>
                        </div>

                        <div className='statPillComment'>
                            <div className='commentCont'>
                                <img className='commentImage' src='./timeline_assets/comment.png'></img>
                            </div>
                            <p className='commentCount'>57</p>
                        </div>
                    </Container>
                </div>
            </Container>
            <hr></hr>
        </div>
    )
}


function Post({ post }) {
    return (
            post.map((x, index) => (
                <PostBlock key={x[0]} username={x[1]} title={x[2]} content={x[3]} date={x[4]} type={x[5]}/>
            ))
    );
}

export default Post;