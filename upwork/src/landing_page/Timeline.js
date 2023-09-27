import { Stack } from 'react-bootstrap';
import TopNav from './components/NavbarTop';
import Post from './components/Post';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Timeline(){
    // const url = 'https://wafflesaucer.alwaysdata.net'
    const url = 'http://localhost:8080/upwork_server/connection.php'
    const [post, setPost] = useState([]);


    const hook = () => {
        axios.get(url)
        .then(response => setPost(response.data));
    }
      
    useEffect(hook, [])


    return(
        <div>
            <TopNav />
            <Stack>
                <Post post={post}/>
            </Stack>

        </div>
    )
}

export default Timeline;