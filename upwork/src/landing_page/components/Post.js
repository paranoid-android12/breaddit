import {Container, Row, Col} from 'react-bootstrap';
import '../styles/postStyle.css';

function PostBlock(){
    
}

function Post({post}) {
    console.log("aga", post)
    return(
        <Container className='postBorder'>
            <p style={{opacity: '50%'}}>Posted by u/yourmother90 3 hours ago</p>
            <h1>Raisins are humanity's greatest sin</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </Container>
    )
}

export default Post;