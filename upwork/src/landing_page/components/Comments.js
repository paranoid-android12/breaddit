import {useEffect, useState } from 'react';
import {Container, Dropdown, Row, Col, Form, Button} from 'react-bootstrap';

import axios from 'axios';
import '../styles/commentStyle.css';


function CommentBlock({comment, user, url}){
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

    function EditComment(){
        const [editContent, setEditContent] = useState(comment.content);
        function handleEditContent(event){
            // console.log(event.target.value);
            setEditContent(event.target.value);
        }

        async function handleEdit(event){
            event.preventDefault();
            if(editContent.length === 0){
                alert("Fill out all the required fields.");
                return;
            }
            let editForm = new FormData();
            editForm.append('function', 'editComment')
            editForm.append('content', editContent);
            editForm.append('id', comment.comment_ID);

            await axios.post(url, editForm, {withCredentials: true})
            .then(response => {
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
                            <h1>Edit Comment</h1>
                            <img onClick={csToggle} className='cs_closeButton' src='http://localhost:8080/upwork_server/breaddit_assets/timeline_assets/close.png'></img>
                        </div>
                        <hr></hr>
                        <Form>
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

    function DeleteComment(){
        async function handleDelete(){
            let deleteform = new FormData();
            
            deleteform.append('function', 'deleteComment')
            deleteform.append('id', comment.comment_ID);

            await axios.post(url, deleteform, {withCredentials: true})
            .then(response => {
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
    function MenuDropdown(){
        if(comment[6] === user.username || user.username === 'admin_wizard'){
            return(
                <div>
                    <Dropdown>
                        <Dropdown.Toggle className='com_statPillMore'>
                            <img className='com_moreImage' src='http://localhost:8080/upwork_server/breaddit_assets/timeline_assets/more.png'></img>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='post_dropdown'>
                            <Dropdown.Item onClick={(event) => csToggle(event)} className='post_editPost'>Edit Comment</Dropdown.Item>
                            <Dropdown.Item onClick={(event) => delToggle(event)} className='post_editPost'>Delete Comment</Dropdown.Item>
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
        <Container className='com_commentContainer d-flex row align-items-center'>
            <EditComment/>
            <DeleteComment/>
            <div className='d-flex col align-items-center justify-content-between'>
                <div className='d-flex col align-items-center'>
                    <div className='com_profileImageCont'>
                        <img className='com_profileImage' src={comment.profile_image}></img>
                    </div>
                    <p className='com_username'>{comment[6]}</p>
                </div>
                <MenuDropdown/>
            </div>

            
            <div className='d-flex row'>
                <p className='com_content'>{comment[3]}</p>
            </div>
            <br></br>
        </Container>
    )
}

function Comments({id, user}){
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
            <CommentBlock key={x[0]} comment={x} user={user} url={url}/>
        ))
);
}

export default Comments;