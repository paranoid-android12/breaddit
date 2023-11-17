import {Container, Row, Form, Button} from 'react-bootstrap';
import { useState } from 'react';
import TopNav from './components/NavbarTop';
import './styles/loginStyle.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
    const url = 'http://localhost:8080/upwork_server/login.php'
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    
    function handleUsernameChange(event){
        setUsername(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }



    async function handleSubmit(event){
        event.preventDefault();
        let accountData = new FormData();
        accountData.append('username', username);
        accountData.append('password', password);

        await axios.post(url, accountData, {withCredentials: true})
        .then(response => {
            if(response.data == '200'){
                navigate('../Timeline.js');
            }
            else{
                alert('Something went wrong.');
                setUsername('');
                setPassword('');
            }
        })
        .catch(error => console.log(error.message));

        
    }
    
    console.log(username, '     ', password);
    return (
        <div>
            <TopNav/>
            <div className='window'>
                <Container className='mainLogBox'>
                    <Container className='mainContent'>
                        <h1>Log In</h1>
                        <p>By continuing, you agree to our <a className='blue'>User Agreement</a> and acknowledge that you understand the <a className='blue'>Privacy Policy.</a></p>
                        <hr></hr>
                        <Form >
                            <Form.Group controlId="formUsername">
                                <Form.Control as='input' className='usernameInput' type="username" value={username} placeholder="Username" onChange={handleUsernameChange}/>
                            </Form.Group>
                            <br></br>
                            <Form.Group controlId="formPassword">
                                <Form.Control as='input' className='usernameInput' type="password" value={password} placeholder="Password" onChange={handlePasswordChange}/>
                            </Form.Group>
                            <hr></hr>
                            <p><a className='blue'>Forgot</a> your username and password?</p>
                            <p>New to Breaddit? <a className='blue'>Sign up.</a></p>
                            <br></br>
                            <button onClick={(event) => handleSubmit(event)} className='mainLogin'>Log In</button>
                        </Form>
                    </Container>
                </Container>
            </div>
        </div>
    );
}

export default Login;