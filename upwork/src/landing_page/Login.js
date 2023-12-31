import {Container, Row, Form, Button} from 'react-bootstrap';
import { useState } from 'react';
import TopNav from './components/NavbarTop';
import './styles/loginStyle.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
    const url = 'http://localhost:8080/upwork_server/api/controller/tunnel.php'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    console.log(email, password);
    const [test, setText] = useState();
    const noFound = document.getElementById('errorText');

    const navigate = useNavigate();
    
    function handleEmailChange(event){
        noFound.style.display = 'none';
        setEmail(event.target.value);
    }

    function handlePasswordChange(event){
        noFound.style.display = 'none';
        setPassword(event.target.value);
    }


    async function handleSubmit(event){
        event.preventDefault();
        let accountData = new FormData();
        accountData.append('function', 'login');
        accountData.append('email', email);
        accountData.append('password', password);

        await axios.post(url, accountData, {withCredentials: true})
        .then(response => {
            console.log(response.data);
            if(response.data == '200'){
                navigate('../timeline');
            }
            else{
                noFound.style.display = 'block';
                setEmail('');
                setPassword('');
            }
        })
        .catch(error => console.log(error.message));
    }
    
    return (
        <div>
            <TopNav/>
            <div className='window'>
                <Container className='mainLogBox'>
                    <Container className='mainContent'>
                        <h1>Log In</h1>
                        <p>By continuing, you agree to create this account in accordance to the internet cyberbullying policy.</p>
                        <hr></hr>
                        <Form >
                            <Form.Group controlId="formUsername">
                                <Form.Control as='input' className='usernameInput' type="email" value={email} placeholder='Email' onChange={handleEmailChange}/>
                            </Form.Group>
                            <br></br>
                            <Form.Group controlId="formPassword">
                                <Form.Control as='input' className='usernameInput' type="password" value={password} placeholder='Password' onChange={handlePasswordChange}/>
                            </Form.Group>
                            <p className='errorMess' id={'errorText'}>Invalid parameters, make sure the email and password is correct.</p>
                            <hr></hr>
                            <p>New to Breaddit? <a onClick={() => navigate('../register')} className='blue'>Sign up.</a></p>
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