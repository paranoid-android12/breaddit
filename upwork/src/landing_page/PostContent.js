import TopNav from './components/NavbarTop.js';
import Side from './components/SideBar.js';
import Suggest from './components/SubredditSuggestion.js';
import Comments from './components/Comments.js';
import {Col, Row, Image, Button, Container, Sidebar, Form} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {useEffect, useState } from 'react';
import axios from 'axios';

function Content({isImage, content}){
    if(isImage == '0'){
        return(
            <p className='pc_content'>{content}</p>
        )
    }
    else if(isImage == '1'){
        return(
            <div>
                <div className='pc_postImageContainer'>
                    <img className='pc_postImage' src={content}></img>
                </div>
            </div>
        )
    }
}

function PostComponent({post}){
    return(
        <div>
            <br></br>
            <Container className='pc_userInf d-flex'>
                <div className='pc_postImageCont'>
                    <img className='pc_postImage' src={post[0][5]}></img>
                </div>
                <Row style={{marginLeft: '0px', alignContent: 'center'}}>
                    <p className='pc_subredditName'>r/{post[0][4]}</p>
                    <p className='pc_username'>{post[0][2]}</p>
                </Row>
            </Container>
            <br></br>
            <h1 className='pc_title'>{post[0][6]}</h1>
            <Content isImage={post[0][9]} content={post[0][7]}/>
        </div>
    )
}


function PostContent(){
    const {id} = useParams();
    const url = 'http://localhost:8080/upwork_server/api/controller/tunnel.php'
    const [sinPost, setSinPost] = useState([[]]);
    const [comment, setComment] = useState('');

    let singlePostPackage = new FormData();
    singlePostPackage.append('function', 'fetchPostSingle');
    singlePostPackage.append('id', id);

    const getPostData = () => {
        axios.get(url, {params: {'function': 'fetchPostSingle', 'id': id}})
        .then(response => {
            setSinPost(response.data);
        });
    }

    useEffect(getPostData, [])

    function handleCommentChange(event){
        setComment(event.target.value);
    }

    function handleCommentSubmit(event){        
        let commentData = new FormData();
        commentData.append('function', 'submitComment')
        commentData.append('comment', comment);
        commentData.append('post_ID', id);


        axios.post(url, commentData, {withCredentials: true})
        .then(response => {
            console.log(response.data);
            setComment('');
            alert('Comment has been successfully submitted!');
        })
        .catch(error => alert(error.message));
    }


    return(
        <div>
            <TopNav/>
            <Container>
                <Row>
                    <Side/>
                    <Col className='flex-row col-12 col-lg-10'>
                        <Row>
                            <Col className='pc_container col-12 col-lg-8'>
                                <PostComponent post={sinPost}/>
                                <Container className='d-flex flex-row' style={{padding: '0px'}}>
                                    <div className='statPillVote'>
                                        <div className='voteCont'>
                                            <img className='upvoteImage' src='/timeline_assets/arrowup.png'></img>
                                        </div>
                                        <p className='voteCountDisplay'>12</p>
                                        <div className='downvoteCont'>
                                            <img className='downvoteImage' src='/timeline_assets/arrowdown.png'></img>
                                        </div>
                                    </div>

                                    <div className='statPillComment'>
                                        <div className='commentCont'>
                                            <img className='commentImage' src='/timeline_assets/comment.png'></img>
                                        </div>
                                        <p className='commentCount'>57</p>
                                    </div>
                                </Container>
                                <hr></hr>
                                <p>Comment as u/{sinPost[0][4]}</p>
                                <p style={{opacity: '60%', marginBottom: '5px'}}>{comment.length}/300</p>
                                <Form>
                                    <Form.Group className='mb-3'>
                                        <Form.Control maxLength={300} as="textarea" type="content" className='contentInput' placeholder="What are your thoughts?" onChange={handleCommentChange}/>
                                    </Form.Group>
                                    <Button className='pc_submitComment' type='submit' onClick={(event) => handleCommentSubmit(event)}>Submit Comment</Button>
                                </Form>
                                <br></br>
                                <Comments id={id}/>
                            </Col>
                            <Col className='suggestMainBox col-4 d-none d-lg-block'>
                                <br></br>
                                <Suggest/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PostContent;