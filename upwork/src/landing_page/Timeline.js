import {Container} from 'react-bootstrap';
import TopNav from './components/NavbarTop';
import Post from './components/Post';

function Timeline(){
    return(
        <div>
            <TopNav />

            <Container>
                <Post />
            </Container>
        </div>
    )
}

export default Timeline;