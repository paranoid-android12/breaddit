import {Container, Button, Form, Row, Col, Tabs, Tab, Dropdown} from 'react-bootstrap';
import * as React from "react";
import { useEffect,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/postStyle.css';
import axios from 'axios';

function Content({content, type}){
    if(type == 0){
        return(
            <div>
                <p className='contentPost'>{content}</p>
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

function UpvoteImage({upvoted}){
    if(upvoted === 0){
        return(
            <img className='upvoteImage' src='/timeline_assets/arrowup.png'></img>
        )
    }
    else{
        return(
            <img className='upvoteImageClicked' src='/timeline_assets/arrowup.png'></img>
        )
    }
}


function PostBlock({id, subreddit, subredditImage, username, title, content, date, type, vote, upvoted, user}){
    const navigate = useNavigate();
    const [isUpvoted, setIsUpvoted] = useState(upvoted);
    const [liveVote, setLiveVote] = useState(vote);
    let url = '../timeline/comments/' + id;
    const surl = 'http://localhost:8080/upwork_server/api/controller/tunnel.php';
    let upData = new FormData();
    upData.append('user_ID', user.user_ID);
    upData.append('post_ID', id);

    async function addUpvote(){
        await axios.post(surl, upData, {withCredentials: true})
        .then(response => {
            console.log(response.data);
        })
        .catch(error => alert(error.message));
    }


    function handleVote(event, voteType, isUpvoted){
        event.preventDefault();

        if(voteType == 1){
            if(isUpvoted === 0){
                //Place upvote
                setIsUpvoted((x) => {
                    return user.user_ID;
                });
                
                setLiveVote((x) => {
                    return x + 1;
                })
                upData.append('function', 'addUpvote');
                addUpvote();
            }
            else{
                //Remove upvote
                setIsUpvoted((x) => {
                    return 0;
                });

                setLiveVote((x) => {
                    return x - 1;
                })
                upData.append('function', 'removeUpvote');
                addUpvote();
            }
        }
        else if(voteType == 0){
            console.log("Downvote is now: ", isUpvoted);
        }
    }



    return(
        <div>
            <Container className='postBorder'>
                <div className='postMargin'>
                    <Container className='postDetails d-flex column'>
                        <div className='d-flex column align-items-center'>
                            <div className='subredditImageCont'>
                                <img className='subredditImage' src={subredditImage}></img>
                            </div>
                            <div>
                                <p className='subredditName'>r/{subreddit}</p>
                                <p className='userInfoPost'>u/{username}   {date}</p>
                            </div>
                            
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle className='statPillMore' >
                                <img className='moreImage' src='/timeline_assets/more.png'></img>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Container>
                    <h1 className='titlePost'>{title}</h1>
                    <Content content={content} type={type}/>
                    <Container className='d-flex flex-row' style={{padding: '0px'}}>
                        <div className='statPillVote'>
                            <div className='voteCont' onClick={(event) => handleVote(event, 1, isUpvoted)} >
                                <UpvoteImage upvoted={isUpvoted}/>
                            </div>

                            <p className='voteCountDisplay'>{liveVote}</p>

                            <div className='downvoteCont' onClick={(event) => handleVote(event, 0, upvoted)} >
                                <img className='downvoteImage' src='/timeline_assets/arrowdown.png' id='downvoteButton'></img>
                            </div>
                        </div>

                        <div className='statPillComment' onClick={() => navigate(url)}>
                            <div className='commentCont'>
                                <img className='commentImage' src='/timeline_assets/comment.png'></img>
                            </div>
                            {/* <p className='commentCount'>57</p> */}
                        </div>


                    </Container>
                </div>
            </Container>
            <hr></hr>
        </div>
    )
}


function Post({ user, post }) {
    return (
            post.map((x, index) => (
                <PostBlock key={x[0]} id={x[0]} subreddit={x[4]} subredditImage={x[5]} username={x[2]} title={x[6]} content={x[7]} date={x[8]} type={x[9]} vote={x[10]} upvoted={x[12]} user={user}/>
            ))
    );
}

export default Post;