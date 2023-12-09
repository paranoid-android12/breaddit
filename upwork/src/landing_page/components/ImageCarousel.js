import {Container, Row} from 'react-bootstrap';
import * as React from "react";
import '../styles/carousel.css';

function ImageCar({src, title, content}){
    return(
        <div className='imageRow'>
            <img className='imageContent' src={src}></img>
            <div className='textAnchor'>
                <h2 className='imageTitle'>{title}</h2>
                <p className='imageContent'>{content}</p>
            </div>
        </div>
    )
}

function ImageCard() {
    return (
        <Row className="d-flex flex-nowrap overflow-auto">
            <ImageCar src={'http://localhost:8080/upwork_server/breaddit_assets/temp_carousel/amazon.png'} title={'Amazon Rainforest'} content={'The Amazon rainforest, covering much...'}/>
            <ImageCar src={'http://localhost:8080/upwork_server/breaddit_assets/temp_carousel/burger.jpg'} title={'Hamburger Recipes'} content={'Normally, hamburgers are self-explan...'}/>
            <ImageCar src={'http://localhost:8080/upwork_server/breaddit_assets/temp_carousel/steamdeck.jpg'} title={'Steam Deck'} content={'The OLED version had been released ju...'}/>
            <ImageCar src={'http://localhost:8080/upwork_server/breaddit_assets/temp_carousel/worldcup.png'} title={'Upcoming World Cup'} content={'The tallying commission had already sta...'}/>

        </Row>
    );
}

export default ImageCard;