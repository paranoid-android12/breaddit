import {useEffect, useState } from 'react';
import {Container, Dropdown} from 'react-bootstrap';
import axios from 'axios';
import '../styles/commentStyle.css';


function CommentBlock({comment, user}){
    console.log(comment[6], user.username);

    function MenuDropdown(){
        if(comment[6] === user.username){
            return(
                <div>
                    <Dropdown>
                        <Dropdown.Toggle className='statPillMore'>
                            <img className='moreImage' src='/timeline_assets/more.png'></img>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Edit Post</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Delete Post</Dropdown.Item>
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
        <Container>
            <div className='d-flex col justify-content-between align-items-center'>
                <p className='com_username'>u/{comment[6]}</p>
                <MenuDropdown/>
            </div>
            <p className='com_content'>{comment[3]}</p>
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
            <CommentBlock key={x[0]} comment={x} user={user}/>
        ))
);
}

export default Comments;