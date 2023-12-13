import {Container, Row, Form, Alert} from 'react-bootstrap';
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
    const [otp, setOtp] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const emptyThingy = document.getElementById('emptyError');

    function handleOtpChange(event){
        setOtp(event.target.value);
    }
    
    function handleUsernameChange(event){
        setUsername(event.target.value);
        emptyThingy.style.display = 'none';
        const alphanumericRegex = /^[a-zA-Z0-9_]+$/;

        const userExistText = document.getElementById('userExistText');
        userExistText.style.display = 'none'
        const userForm = document.getElementById('usernameForm');
        const errorText = document.getElementById('errorText')
    
        if(!alphanumericRegex.test(event.target.value) && event.target.value.length > 0){
            userForm.style.outline = '3px solid rgb(255, 110, 128)';
            setValidUsername(false);
            errorText.style.display = 'block'
        }
        else{
            setValidUsername(true);
            userForm.style.outline = 'none'
            errorText.style.display = 'none'
        }

    }

    function handleEmailChange(event){
        setEmail(event.target.value);
        emptyThingy.style.display = 'none';
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const emailExistText = document.getElementById('emailExistText');
        emailExistText.style.display = 'none';
        const emailForm = document.getElementById('emailForm');
        const errorText = document.getElementById('emailSyntaxErr');

        if(!emailRegex.test(event.target.value.toLowerCase()) && event.target.value.length > 0){
            setValidEmail(false);
            emailForm.style.outline = '3px solid rgb(255, 110, 128)'
            errorText.style.display = 'block'
        }
        else{
            setValidEmail(true);
            emailForm.style.outline = 'none'
            errorText.style.display = 'none'
        }
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;
        const passForm = document.getElementById('passForm');
        const errorText = document.getElementById('passLengthErr')
        emptyThingy.style.display = 'none';
    
        if(event.target.value.length < 8 && event.target.value.length > 0){
            passForm.style.outline = '3px solid rgb(255, 110, 128)';
            setValidPassword(false);
            errorText.style.display = 'block'
        }
        else{
            setValidPassword(true);
            passForm.style.outline = 'none';
            errorText.style.display = 'none'
        }
    }

    function handleExist(response){
        const userExistText = document.getElementById('userExistText');
        const emailExistText = document.getElementById('emailExistText');
        const userForm = document.getElementById('usernameForm');
        const emailForm = document.getElementById('emailForm');
        const signUpForm = document.getElementById('signUpForm');
        const otpForm = document.getElementById('otpForm');
        const noEmail = document.getElementById('wrongOtp');

        if(response === 3){
            userExistText.style.display = 'block';
            emailExistText.style.display = 'block';
            userForm.style.outline = '3px solid rgb(255, 110, 128)';
            emailForm.style.outline = '3px solid rgb(255, 110, 128)'
        }
        else if (response === 2){
            emailExistText.style.display = 'block'; 
            emailForm.style.outline = '3px solid rgb(255, 110, 128)'
        }
        else if (response === 1){
            userExistText.style.display = 'block';
            userForm.style.outline = '3px solid rgb(255, 110, 128)';
        }
        else if(response === 4){
            noEmail.style.display = 'block';
            userForm.style.outline = '3px solid rgb(255, 110, 128)';
        }
        else if (response === 200){
            signUpForm.style.display = 'none';
            otpForm.style.display = 'flex';
        }
    }

    async function handleSubmit(event){
        event.preventDefault();


        if(username.length <= 0 || email.length <= 0 || password <= 0){
            emptyThingy.style.display = 'block';
            // alert("The given parameters are empty!");
            return;
        }
        else{
            emptyThingy.style.display = 'none';
        }

        if(validUsername && validEmail && validPassword){
            let accountData = new FormData();
            accountData.append('function', 'validateRegister');
            accountData.append('username', username);
            accountData.append('email', email);
            accountData.append('password', password);
    
            await axios.post(url, accountData, {withCredentials: true})
            .then(response => {
                console.log(response.data);
                handleExist(response.data);
            })
            .catch(error => alert(error.message));
        }
        else{
            console.log("Invalid Parameters!");
        }
    }

    async function handleOtp(event){
        event.preventDefault();
        let otpData = new FormData();
        otpData.append('function', 'register');
        otpData.append('username', username);
        otpData.append('email', email);
        otpData.append('password', password);
        otpData.append('otpInp', otp);
        await axios.post(url, otpData, {withCredentials: true})
        .then(response => {
            setOtp('');
            handleExist(response.data);
        })
        .catch(error => alert(error.message));
    }
    

    return (
        <div>
            <TopNav/>
            <div className='window'>
                <Container id={'signUpForm'} className='register_mainLogBox'>
                    <h1>Sign Up</h1>
                    <p>By continuing, you agree to create this account in accordance to the internet cyberbullying and privacy policy.</p>
                    <hr></hr>
                    <Form style={{padding: '0'}}>
                        <p style={{opacity: '60%', marginBottom: '5px', fontSize: '0.7rem', paddingLeft: '12px'}}>{username.length}/15</p>
                        <Form.Group className='d-flex align-items-center' autoComplete='false'  id="formUsername">
                            <Form.Control autoComplete='false' id={'usernameForm'} maxLength={15} as='input' className='usernameInput' type="username" placeholder="Username" onChange={handleUsernameChange} value={username}/>
                        </Form.Group>
                        <p className='errorMess' id={'errorText'}>The username must not contain any special characters.</p>
                        <p className='errorMess' id={'userExistText'}>This username already exists.</p>
                        <br></br>
                        <Form.Group autoComplete='false' id="formPassword">
                            <Form.Control autoComplete='false' id={'emailForm'} as='input' className='usernameInput' type="email" placeholder="Email" onChange={handleEmailChange} value={email}/>
                        </Form.Group>
                        <p className='errorMess' id={'emailSyntaxErr'}>The given e-mail has invalid syntax.</p>
                        <p className='errorMess' id={'emailExistText'}>This email is already registered on Breaddit.</p>
                        <p className='errorMess' id={'emailCantFind'}>The OTP can't be sent on the given email, make sure it exists.</p>
                        <br></br>
                        <Form.Group autoComplete='false' id="formUsername">
                            <Form.Control autoComplete='false' id={'passForm'} as='input' className='usernameInput' type="password" placeholder="Password" onChange={handlePasswordChange} value={password}/>
                        </Form.Group>
                        <p className='errorMess' id={'passLengthErr'}>The password length must be 8 characters min.</p>
                        <hr></hr>
                        <p className='errorMess' id={'emptyError'}>The given parameters are empty!</p>
                        <button onClick={(event) => handleSubmit(event)} className='mainLogin'>Submit</button>
                    </Form>
                </Container>

                <br></br>

                <Container id={'otpForm'} className='otpLogBox'>
                <h1>OTP Verification</h1>
                    <p>The code has been sent to the email you registered with. Please enter the code you had received below.</p>
                    <hr></hr>
                    <Form style={{padding: '0'}}>
                        <Form.Group className='d-flex align-items-center' autoComplete='false'  id="formUsername">
                            <Form.Control autoComplete='false' id={'otpForm'} as='input' className='usernameInput' type="otp" placeholder="Code" onChange={handleOtpChange} value={otp}/>
                        </Form.Group>
                        <p className='errorMess' id={'wrongOtp'}>The submitted code is incorrect.</p>
                        <hr></hr>
                        <button onClick={(event) => handleOtp(event)} className='mainLogin'>Submit</button>
                    </Form>
                </Container>
            </div>
        </div>
    );

}



export default Register;