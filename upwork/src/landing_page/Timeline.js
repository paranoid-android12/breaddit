import {Container} from 'react-bootstrap';
import TopNav from './components/NavbarTop';
import Post from './components/Post';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Timeline(){
    const url = 'http://localhost:8080/upwork_server/connection.php'
    const [post, setPost] = useState([]);


    const hook = () => {
        console.log('effect')
        axios.get(url)
        .then(response => setPost(response.data));
    }
      
    useEffect(hook, [])


    return(
        <div>
            <TopNav />

            <Container>
                <Post post={post}/>
            </Container>
        </div>
    )
}

export default Timeline;