import TopNav from './components/NavbarTop.js';
import Side from './components/SideBar.js';
import Suggest from './components/SubredditSuggestion.js';
import Comments from './components/Comments.js';
import Post from './components/Post.js';
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
                <br></br>
            </div>
        )
    }
}

function PostContent({user, post}){
    const {id} = useParams();
    const url = 'http://localhost:8080/upwork_server/api/controller/tunnel.php'
    const [sinPost, setSinPost] = useState([[]]);
    const [comment, setComment] = useState('');



    let singlePostPackage = new FormData();
    singlePostPackage.append('function', 'fetchPostSingle');
    singlePostPackage.append('id', id);

    async function getPostData(){
        await axios.get(url, {params: {'function': 'fetchPostSingle', 'id': id}, withCredentials: true})
        .then(response => {
            setSinPost(response.data);
        });
    }

    useEffect(() => {getPostData()}, []);

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
            <div className='d-flex justify-content-center'>
                <div className='mainTimelineContainer'>
                    <Row>
                        <Side/>
                        <Col className='flex-row col-12 col-lg-10'>
                            <Row>
                                <Col className='pc_container col-12 col-lg-8'>
                                    <br></br>
                                    <Post user={user} post={sinPost}/>
                                    <p>Comment as u/{sinPost[4]}</p>
                                    <p style={{opacity: '60%', marginBottom: '5px'}}>{comment.length}/300</p>
                                    <Form>
                                        <Form.Group className='mb-3'>
                                            <Form.Control maxLength={300} as="textarea" type="content" className='contentInput' placeholder="What are your thoughts?" onChange={handleCommentChange}/>
                                        </Form.Group>
                                        <Button className='pc_submitComment' type='submit' onClick={(event) => handleCommentSubmit(event)}>Submit Comment</Button>
                                    </Form>
                                    <br></br>
                                    <Comments id={id} user={user}/>
                                </Col>
                                <Col className='suggestMainBox col-4 d-none d-lg-block'>
                                    <br></br>
                                    <Suggest/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default PostContent;