import {Container, Row, Form, Button} from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import TopNav from './components/NavbarTop';
import './styles/loginStyle.css';
import { Link, useNavigate } from 'react-router-dom';



function Register() {
    const url = 'http://localhost:8080/upwork_server/api/controller/tunnel.php'
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    function handleUsernameChange(event){
        setUsername(event.target.value);
    }

    function handleEmailChange(event){
        setEmail(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }

    async function handleSubmit(event){
        event.preventDefault();
        let accountData = new FormData();
        accountData.append('function', 'register');
        accountData.append('username', username);
        accountData.append('email', email);
        accountData.append('password', password);

        await axios.post(url, accountData)
        .then(response => {
            event.preventDefault();
            setUsername('');
            setEmail('');
            setPassword('');
            console.log(response.data);
        })
        .catch(error => alert(error.message));
    }

    return (
        <div>
            <TopNav/>
            <div className='window'>
                <Container className='mainLogBox'>
                    <Container className='mainContent'>
                        <h1>Sign Up</h1>
                        <p>By continuing, you agree to our <a className='blue'>User Agreement</a> and acknowledge that you understand the <a className='blue'>Privacy Policy.</a></p>
                        <hr></hr>
                        <Form >
                            <Form.Group controlId="formUsername">
                                <Form.Control as='input' className='usernameInput' type="username" placeholder="Username" onChange={handleUsernameChange} value={username}/>
                            </Form.Group>
                            <br></br>
                            <Form.Group controlId="formPassword">
                                <Form.Control as='input' className='usernameInput' type="email" placeholder="Email" onChange={handleEmailChange} value={email}/>
                            </Form.Group>
                            <br></br>
                            <Form.Group controlId="formUsername">
                                <Form.Control as='input' className='usernameInput' type="password" placeholder="Password" onChange={handlePasswordChange} value={password}/>
                            </Form.Group>
                            <hr></hr>
                            <button onClick={(event) => handleSubmit(event)} className='mainLogin'>Log In</button>
                        </Form>
                    </Container>
                </Container>
            </div>
        </div>
    );
}

export default Register;