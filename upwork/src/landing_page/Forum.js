import { useState } from 'react';
import {Container, Button, Form, Row, Col, Tabs, Tab} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TopNav from './components/NavbarTop.js';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/forumStyle.css';


function Forum(){
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    function handleNameChange(event) {
        setName(event.target.value);
    }    

    function handleTitleChange(event) {
        setTitle(event.target.value);
    }  

    function handleContentChange(event) {
        setContent(event.target.value);
    }  

    function handleSubmit(event){
        event.preventDefault();
        console.log(name.length, title.length, content.length);
        if(name.length === 0 || title.length === 0 || content.length === 0){
            alert("Fill out all the required fields.");
        }
        else{
            // const url = 'https://wafflesaucer.alwaysdata.net'
            const url = 'http://localhost:8080/upwork_server/connection.php'

            let fData = new FormData();
            fData.append('username', name);
            fData.append('title', title);
            fData.append('content', content);
            
            axios.post(url, fData)
            .then(response => alert(response.data))
            .catch(error => alert(error.message));

            setName('');
            setTitle('');
            setContent('');
        }
    }

    function previewImage(event){
        const fileInput = event.target;
        const file = fileInput.files[0];
        const imagePreview = document.getElementById('image-preview')
        const imageToUploadContainer = document.getElementById('imageToUploadContainer');
        const imageUploadedContainer = document.getElementById('imageUploadedContainer');
        const formUpload = document.getElementById('formUpload')

        if(file){
            const reader = new FileReader();
            reader.onload = function(event){
                imagePreview.src = event.target.result;
                imagePreview.style.maxWidth = '100%';
                imageToUploadContainer.style.display = 'none';
                imageUploadedContainer.style.display = 'block';
                formUpload.style.height = '100%';
            };
            reader.readAsDataURL(file);
        }
        else{
            imagePreview.src = '';
            imagePreview.style.display = 'none';
        }
    }

    return(
        <div>
            <TopNav/>
            <br></br>
            <Container className='mainCont'>
                <h3>Create a post</h3>
                <hr></hr>
                <Tabs
                defaultActiveKey="post"
                id="uncontrolled-tab-example"
                className="custom-tabs"
                fill
                >
                    <Tab className='tabOneCont' eventKey="post" title="Post">
                        <Container>
                            <br></br>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicTitle">
                                    <Form.Control as='input' className='titleInput' type="title" placeholder="Title"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicContent">
                                    <Form.Control as='textarea' className='contentInput' type="content" placeholder="Text (Optional)"/>
                                </Form.Group>
                            </Form>
                            <hr></hr>
                            <Container>
                                <Button type='submit' className='createPost'>Post</Button>
                            </Container>
                            <br></br>
                        </Container>
                    </Tab>
                    
                    <Tab className='tabOneCont' eventKey="image" title="Image">
                        <Container>
                            <br></br>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicTitle">
                                    <Form.Control as='input' className='titleInput' type="title" placeholder="Title"/>
                                </Form.Group>
                                <Form.Group className="formUpload mb-3" controlId="formBasicImage" id='formUpload'>
                                    <div id='imageToUploadContainer'> 
                                        <label for="file-upload" class="custom-file-upload">
                                            <i class="fa fa-cloud-upload"></i> Upload Images
                                        </label>
                                        <input id="file-upload" type="file" onChange={event => previewImage(event)}/>
                                    </div>
                                    <div id='imageUploadedContainer' style={{display: 'none'}}>
                                        <img id='image-preview' src='' alt='Uploaded Image'></img>
                                    </div>
                                </Form.Group>
                                <hr></hr>
                                <Container>
                                    <Button type='submit' className='createPost'>Post</Button>
                                </Container>
                            </Form>
                            <br></br>
                        </Container>
                    </Tab>

                </Tabs>
                {/* <p><small>Please be mindful of breaddit's content policy and practice good breaddiquette.</small></p> */}
            </Container>
        </div>
    )
}

export default Forum;