import { useEffect, useState } from 'react';
import {Container, Button, Form, Row, Col, Tabs, Tab, Dropdown} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import TopNav from './components/NavbarTop.js';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/forumStyle.css';

function SubredditForum({id, name, src, change}){
    return(
        <div className='subredditDropMargin d-flex col' onClick={() => change(id, name, src)}>
            <div className='subredditImagePlc'>
                <img className='subredditImageForum' src={src}></img>
            </div>
            <p className='subredditDropName'>r/{name}</p>
        </div>
    )
}

function SubredditIter({subredditList, change}){
    return(
        subredditList.map((x, index) => (
            <SubredditForum key={x[0]} id={x[0]} name={x[1]} src={x[5]} change={change}/>
        ))
    );
}

function Forum({url}){

    const [name, setName] = useState('admin');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedSubreddit, setSelectedSubreddit] = useState('');
    const [subredditList, setSubredditList] = useState('');
    const [subreddit, setSubreddit] = useState('Choose a Subreddit');
    const [src, setSrc] = useState('http://localhost:8080/upwork_server/breaddit_assets/subreaddit_image_assets/black.png');
    const navigate = useNavigate();

    const postHook = () => {
        axios.get(url, {params: {'function': 'fetchSubreddit'}})
        .then(response => {
            console.log(response.data)
            setSubredditList(response.data);
        });
    }
    useEffect(postHook, [])
    

    function handleNameChange(event) {
        setName(event.target.value);
    }    

    function handleTitleChange(event) {
        setTitle(event.target.value);
    }  

    function handleContentChange(event) {
        setContent(event.target.value);
    } 

    function handleSubredditChange(id, name, src) {
        setSelectedSubreddit(id);
        setSubreddit(name);
        setSrc(src);
    }


    async function imageProcess(event, content, name){
        event.preventDefault();
        console.log(content, name)
        let iData = new FormData();
        iData.append('from', 'post')
        iData.append('function', 'image_parser');
        iData.append('baseString', content);
        iData.append('name', name);

        //Converts base64 image data to image file via php API
        return await axios.post(url, iData)
        .then(response => {
            event.preventDefault();
            return response.data;
        })
        .catch(error => alert(error.message))
        
    }

    async function handleSubmit(event, imageType){
        event.preventDefault();
        if(name.length === 0 || title.length === 0 || content.length === 0){
            alert("Fill out all the required fields.");
            return;
        }

        // const url = 'https://wafflesaucer.alwaysdata.net'
        let fData = new FormData();
        fData.append('function', 'submitPost')
        fData.append('username', name);
        fData.append('title', title);
        fData.append('isImage', imageType)
        fData.append('subreddit', selectedSubreddit);
        
        if(imageType === '1'){
            // Save uploaded image, and declare the post content as the image file path
            let fileLoc = await imageProcess(event, content, name);
            event.preventDefault();
            fData.append('content', fileLoc);   
        }
        else{
            //Append normal text content.
            fData.append('content', content);
        }

        //Upload post object to main sql api
        await axios.post(url, fData, {withCredentials: true})
        .then(response => {
            event.preventDefault();
            setName('');
            setTitle('');
            setContent('');
            navigate('../timeline');
        })
        .catch(error => alert(error.message));
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
                setContent(event.target.result);
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
                <Dropdown className='subredditSelectInvBorder'>
                    <Dropdown.Toggle className='subredditSelectCont d-flex align-items-center' variant="success" id="dropdown-basic">
                        <div className='d-flex col align-items-center'>
                                <div className='subredditImagePlc'>
                                    <img className='form_subredditImage' src={src}></img>
                                </div>

                                <p className='subredditText'>r/{subreddit}</p>
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='dropdownPadding'>
                        <Dropdown.Item className='subredditListContainerForm'>
                            <SubredditIter subredditList={subredditList} change={handleSubredditChange}></SubredditIter>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <br></br>
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
                                    <Form.Control as='input' className='titleInput' type="title" placeholder="Title" onChange={handleTitleChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicContent">
                                    <Form.Control as='textarea' className='contentInput' type="content" placeholder="Text (Optional)" onChange={handleContentChange}/>
                                </Form.Group>
                                <hr></hr>
                                <Container>
                                    <Button id='0' type='submit' className='createPost'  onClick={(event) => handleSubmit(event, '0')}>Post</Button>
                                </Container>
                            </Form>
                            <br></br>
                        </Container>
                    </Tab>
                    
                    <Tab className='tabOneCont' eventKey="image" title="Image">
                        <Container>
                            <br></br>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicTitle">
                                    <Form.Control as='input' className='titleInput' type="title" placeholder="Title" onChange={handleTitleChange}/>
                                </Form.Group>
                                <Form.Group className="formUpload mb-3" controlId="formBasicImage" id='formUpload'>
                                    <div id='imageToUploadContainer'> 
                                        <label for="file-upload" className="custom-file-upload">
                                            <i className="fa fa-cloud-upload"></i> Upload Images
                                        </label>
                                        <input id="file-upload" type="file" onChange={event => previewImage(event)}/>
                                    </div>
                                    <div id='imageUploadedContainer' style={{display: 'none'}}>
                                        <img id='image-preview' src='' alt='Uploaded Image'></img>
                                    </div>
                                </Form.Group>
                                <hr></hr>
                                <Container>
                                    <Button id='0' type='submit' className='createPost' onClick={(event) => handleSubmit(event, '1')}>Post</Button>
                                </Container>
                            </Form>
                            <br></br>
                        </Container>
                    </Tab>

                </Tabs>
            </Container>
        </div>
    )
}

export default Forum;