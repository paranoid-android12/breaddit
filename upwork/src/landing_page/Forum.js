import { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import {Nav, Navbar, NavDropdown, Button, Form, Row, Col} from 'react-bootstrap';
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

    return(
        <div>
            <TopNav />
            <Container>
                {/* Top Navbar */}

                <div className='formContainer'>
                    <Container className='containerForm'>
                        <Form className='formBox' onSubmit={handleSubmit}>
                            <Row>
                                <Col lg={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control value={name}className='inputStuffs' placeholder="Enter username" onChange={handleNameChange}/> 
                                    </Form.Group>

                                </Col>                    
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control value={title}className='inputStuffs' placeholder="Enter post title" onChange={handleTitleChange}/> 
                                    </Form.Group>

                                </Col>                    
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Post</Form.Label>
                                        <Form.Control value={content}as="textarea" className='inputStuffs' placeholder="Enter content" rows={4} onChange={handleContentChange}/> 
                                    </Form.Group>

                                </Col>                    
                            </Row>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Container>

                </div>
            </Container>
        </div>
    )
}

export default Forum;