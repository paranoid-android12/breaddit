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
            <img className='upvoteImage' src='http://localhost:8080/upwork_server/breaddit_assets/timeline_assets/arrowup.png'></img>
        )
    }
    else{
        return(
            <img className='upvoteImageClicked' src='http://localhost:8080/upwork_server/breaddit_assets/timeline_assets/arrowup.png'></img>
        )
    }
}

function PostBlock({id, subreddit, subredditImage, username, title, content, date, type, vote, upvoted, user, post, surl}){
    const navigate = useNavigate();
    const [isUpvoted, setIsUpvoted] = useState(upvoted);
    const [liveVote, setLiveVote] = useState(vote);
    const userUrl = '../timeline/u/' + username;
    let url = '../timeline/comments/' + id;
    let subUrl = '../timeline/r/' + subreddit;
    let upData = new FormData();
    upData.append('user_ID', user.user_ID);
    upData.append('post_ID', id);
    
    
    const [createToggled, setCreateToggled] = useState(false);
    const [deleteToggled, setDeleteToggled] = useState(false);
    const csToggle = () => {
        console.log(createToggled);
        setCreateToggled(!createToggled);
    };

    const delToggle = () => {
        console.log(createToggled);
        setDeleteToggled(!deleteToggled);
    }

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

    
    function EditPost(){
        const [editTitle, setEditTitle] = useState(title);
        const [editContent, setEditContent] = useState(content);
        function handleEditTitle(event){
            // console.log(event.target.value);
            setEditTitle(event.target.value);
        }
        function handleEditContent(event){
            // console.log(event.target.value);
            setEditContent(event.target.value);
        }

        async function handleEdit(event){
            event.preventDefault();
            if(editTitle.length === 0 || editContent.length === 0){
                alert("Fill out all the required fields.");
                return;
            }
            let editForm = new FormData();
            editForm.append('function', 'editPost')
            editForm.append('title', editTitle);
            editForm.append('content', editContent);
            editForm.append('id', id);

            await axios.post(surl, editForm, {withCredentials: true})
            .then(response => {
                event.preventDefault();
                alert('Post has been successfully edited!');
                window.location.reload();
                csToggle();
            })
            .catch(error => alert(error.message));
        }

        if(createToggled){
            document.body.style.overflow = 'hidden';
            return(
                <div className='edit_mainCover'>
                    <div className='edit_frame'>
                        <div className='d-flex col justify-content-between align-items-center'>
                            <h1>Edit Post</h1>
                            <img onClick={csToggle} className='cs_closeButton' src='http://localhost:8080/upwork_server/breaddit_assets/timeline_assets/close.png'></img>
                        </div>
                        <hr></hr>
                        <Container className='postDetails d-flex column'>
                            <div className='d-flex column align-items-center'>
                                <div className='subredditImageCont'>
                                    <img className='subredditImage' src={subredditImage}></img>
                                </div>
                                <div>
                                    <div className='d-flex col'>
                                        
                                        <p className='subredditName'>r/{subreddit}</p>
                                        <p className='post_dot'>•</p>
                                        <p className='post_dateInfo'>{date}</p>
                                    </div>
                                    <p className='userInfoPost'  onClick={() => navigate(userUrl, {state:{userData: user}})}>u/{username}</p>
                                </div>
                            </div>
                        </Container>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicTitle">
                                <Form.Control as='input' className='edit_title' type="title" placeholder="Title" onChange={handleEditTitle} value={editTitle}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicContent">
                                <Form.Control as='textarea' className='edit_content' type="content" placeholder="Text (Optional)" onChange={handleEditContent} value={editContent}/>
                            </Form.Group>
                            <hr></hr>
                            <Container>
                                <Button onClick={(event) => handleEdit(event)} id='0' type='submit' className='edit_submitEdit' >Edit</Button>
                            </Container>
                        </Form>
                    </div>
                </div>
            )
        }
        else{
            document.body.style.overflow = '';
        }
    }

    function DeletePost(){
        async function handleDelete(){
            let deleteform = new FormData();
            
            deleteform.append('function', 'deletePost')
            deleteform.append('id', id);

            await axios.post(surl, deleteform, {withCredentials: true})
            .then(response => {
                console.log(response.data);
                alert('Post has been successfully deleted!');
                delToggle();
                window.location.reload();
            })
            .catch(error => alert(error.message));
        }

        if(deleteToggled){
            document.body.style.overflow = 'hidden';
            return(
                <div className='edit_mainCover'>
                    <div className='delete_frame'>
                    <div className='d-flex col justify-content-between align-items-center'>
                            <h1>Delete Post</h1>
                            <img onClick={delToggle} className='cs_closeButton' src='http://localhost:8080/upwork_server/breaddit_assets/timeline_assets/close.png'></img>
                        </div>
                        <hr></hr>
                        <p>Are you sure you want to delete this post?</p>
                        <div className='d-flex col justify-content-around align-content-center'>
                            <Button onClick={() => handleDelete()}>Delete</Button>
                            <Button>Cancel</Button>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            document.body.style.overflow = '';
        }
    }
    
    function MenuDropdown({username, user}){
        if(username === user.username || user.user_ID === 4){
            return(
                <div>
                    <Dropdown>
                        <Dropdown.Toggle className='statPillMore' >
                            <img className='moreImage' src='http://localhost:8080/upwork_server/breaddit_assets/timeline_assets/more.png'></img>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='post_dropdown'>
                            <Dropdown.Item  onClick={(event) => csToggle(event)} className='post_editPost'>Edit Post</Dropdown.Item>
                            <Dropdown.Item onClick={(event) => delToggle(event)} className='post_deletePost'>Delete Post</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            )
        }
        else{
            return(
                <div>
                    
                </div>
            )
        }
    }

    return(
        <div>
            <EditPost/>
            <DeletePost/>
            <Container className='postBorder'>
                <div className='postMargin'>
                    <Container className='postDetails d-flex column'>
                        <div className='d-flex column align-items-center'>
                            <div className='subredditImageCont'>
                                <img onClick={() => navigate(subUrl)} className='subredditImage' src={subredditImage}></img>
                            </div>
                            <div>
                                <div className='d-flex col'>
                                    <p onClick={() => navigate(subUrl)} className='subredditName'>r/{subreddit}</p>
                                    <p className='post_dot'>•</p>
                                    <p className='post_dateInfo'>{date}</p>
                                </div>
                                <p className='userInfoPost'  onClick={() => navigate(userUrl, {state:{userData: user}})}>u/{username}</p>
                            </div>
                        </div>
                        <MenuDropdown username={username} user={user}/>
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
                                <img className='downvoteImage' src='http://localhost:8080/upwork_server/breaddit_assets/timeline_assets/arrowdown.png' id='downvoteButton'></img>
                            </div>
                        </div>

                        <div className='statPillComment' onClick={() => navigate(url)}>
                            <div className='commentCont'>
                                <img className='commentImage' src='http://localhost:8080/upwork_server/breaddit_assets/timeline_assets/comment.png'></img>
                            </div>
                        </div>
                    </Container>
                </div>
            </Container>
            <hr></hr>
        </div>
    )
}



function Post({ user, post, url }) {
    try {
        return (
            post.map((x, index) => (
                <PostBlock key={x[0]} id={x[0]} subreddit={x[4]} subredditImage={x[5]} username={x[2]} title={x[6]} content={x[7]} date={x[8]} type={x[9]} vote={x[10]} upvoted={x[12]} user={user} post={post} surl={url}/>
            ))
        );
    } catch (error) {
        console.log(error);
    }
}

export default Post;