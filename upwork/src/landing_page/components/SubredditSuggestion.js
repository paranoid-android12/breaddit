import {Container, Row} from 'react-bootstrap';
import * as React from "react";
import '../styles/postStyle.css';

function SuggestIter({name, uploads, src}){
    return(
        <div>
            <Container className='suggestionBox'>
                <div className='imageCircle'>
                    <img className='imageMain' src={src}></img>
                </div>
                <Row>
                    <p className='subredditName'>{name}</p>
                    <p className='postCount'>{uploads} Uploads</p>
                </Row>
            </Container>
            <br></br>
        </div>
    )
}

function Suggest() {
    return (
        <Container className='suggestCommunities'>
            <br></br>
            <h2 className='popularCommunities'>POPULAR COMMUNITIES</h2>
            <Row>
                <SuggestIter name={'r/DeadCells'} uploads={'25'} src={'/subreaddit_image_assets/dead_cells.png'}/>
                <SuggestIter name={'r/Crochet'} uploads={'76'} src={'/subreaddit_image_assets/crochet.png'}/>
                <SuggestIter name={'r/Gaming'} uploads={'56'} src={'/subreaddit_image_assets/gaming.png'}/>
                <SuggestIter name={'r/Anime'} uploads={'25'} src={'/subreaddit_image_assets/anime.jpg'}/>
                <SuggestIter name={'r/Java'} uploads={'25'} src={'/subreaddit_image_assets/java.png'}/>
            </Row>
        </Container>
    );
}

export default Suggest;