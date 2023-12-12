import {Navbar, Container, Dropdown, Form, Button, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';


function EditUser({user, togg, toggler, url}){
    const [userImage, setUserImage] = useState('');
    const [name, setName] = useState('');

    function handleNameChange(event){
        console.log(event.target.value);
        setName(event.target.value);
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
                setUserImage(event.target.result);
                imageToUploadContainer.style.display = 'none';
                imageUploadedContainer.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
        else{
            imagePreview.src = '';
            imagePreview.style.display = 'none';
        }
    }

    async function imageProcess(event, content, name, from){
        event.preventDefault();
        let iData = new FormData();
        iData.append('from', from)
        iData.append('function', 'image_parser');
        iData.append('baseString', content);
        iData.append('name', name);

        //Converts base64 image data to image file via php API
        return await axios.post(url, iData)
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => alert(error.message))
        
    }

    async function handleSubmit(event){
        event.preventDefault();
        let uData = new FormData();
        uData.append('function', 'editUser');
        uData.append('id', user.user_ID);
        uData.append('userName', name);

        if(userImage != ''){
            console.log('Has Profile')
            let profLoc = await imageProcess(event, userImage, name, 'userProfile');
            uData.append('profile', profLoc);
        }
        else{
            uData.append('profile', 'http://localhost:8080/upwork_server/breaddit_assets/user_profileimage/user.png');
        }

        await axios.post(url, uData, {withCredentials: true})
        .then(response => {
            console.log(response.data);
        })
        .catch(error => alert(error.message));
    }


    if(togg){       
        document.body.style.overflow = 'hidden';
        return(
            <div className='cs_graybg' id='createSubredditFrame'>
                <div className='cs_mainWindow'>
                        <div className='d-flex col justify-content-between align-items-center'>
                            <h1>Edit User Profile</h1>
                            <img onClick={toggler} className='cs_closeButton' src='http://localhost:8080/upwork_server/breaddit_assets/timeline_assets/close.png'></img>
                        </div>
                        <hr></hr>
                        <Form>
                            <Row>
                                <Col className='col-12 col-sm-4'>
                                    <Form.Group className="cs_formUpload mb-3" controlId="formBasicImage" id='formUpload'>
                                        <div id='imageToUploadContainer'> 
                                            <label for="file-upload" className="cs_custom-file-upload">
                                                <i className="fa fa-cloud-upload"></i> +
                                            </label>
                                            <input id="file-upload" type="file" onChange={event => previewImage(event)}/>
                                        </div>
                                        <div className='cs_formImageCont' id='imageUploadedContainer' style={{display: 'none'}}>
                                            <img className='cs_formImage' id='image-preview'  src='' alt='Uploaded Image'></img>
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicTitle">
                                        <h6>Username</h6>
                                        <Form.Control as='input' className='titleInput' type="title" title='asd' onChange={handleNameChange}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <hr></hr>
                            <Button id='0' type='submit' onClick={(event) => handleSubmit(event)}>Post</Button>
                        </Form>
                </div>
            </div>
        )
    }
    else{
        document.body.style.overflow = '';
    }
}



export default EditUser;