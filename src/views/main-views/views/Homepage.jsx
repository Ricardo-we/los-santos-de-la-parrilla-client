// UTILS/CSS
import '../css/Homepage.css';
import { useState, useEffect } from "react";
import { getEventsPaginated } from '../../../libs/requests/events-requests';

// IMAGES
import image1 from '../../img/asado-1.jpg';
import image2 from '../../img/carne-1.jpg';
import image3 from '../../img/costillas-1.jpg';
import image4 from '../../img/pizza.jpg';
import image5 from '../../img/pollo-1.jpg';
import image6 from '../../img/pollo-2.jpg';
import image7 from '../../img/carne-2.jpg';

// COMPONENTS
import NavBar from "../components/NavBar";
import Slider from '../../public-components/Slider';
import { HorizontalCard } from '../../public-components/Card';
import Footer from '../components/Footer'; 

const Slide = ({ title="", content="", image, alignment="center" }) => (
    <div className="slider-img-text" style={{backgroundImage: `url(${image})`}}>
        <div className={"container d-flex flex-column align-items-"+alignment}>
            <h1>{title}</h1>
            <h3>{content}</h3>
        </div>
    </div>
)

function Homepage() {
    const [lastTwoEvents, setLastTwoEvents] = useState([{title: '', image: image4}, {title: '', image: image5}, ]);

    const SLIDES_IMAGES = [
        <Slide title="La mejor carne" image={image1}/>,
        <Slide title="Alta calidad" content="Disfruta unas exquisitas costillas" image={image2}/>,
        <Slide slideTitle="La mejor carne" image={image3}/>,
    ]

    
    const getLastTwoEventsHandler = async () => {
        const response = await getEventsPaginated(2,'last')
        setLastTwoEvents(response);
        if(lastTwoEvents.length > 0){
            SLIDES_IMAGES.push(<Slide 
                title={lastTwoEvents[0].title} 
                alignment="start"
                content={lastTwoEvents[0].description} 
                image={lastTwoEvents[0].image.url}
            />,
            <Slide 
                title={lastTwoEvents[1].title} 
                alignment='end'
                content={lastTwoEvents[1].description} 
                image={lastTwoEvents[1].image.url}
            />,)
        }
    }

    useEffect(() => {
        document.title = "Los santos de la parrilla"
        getLastTwoEventsHandler()
    }, [])

    return ( 
    <>
        <NavBar/>
        <Slider slides={SLIDES_IMAGES}/>
        <div className="main-wraper">
            <div className="container-xl">
                <div className="row">
                    <div className="col d-flex flex-column align-items-center justify-content-center">
                        <h1>Quiénes somos?</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eius soluta voluptates veritatis temporibus ullam accusantium ipsa neque fuga nam expedita vel, totam odit ipsum aut praesentium doloremque, magnam adipisci.
                        </p>
                    </div>
                    <div className="col d-flex flex-column align-items-center">
                        <img src={image6} className="img img-fluid"/>
                    </div>
                </div>
            </div>
            <div className="container-xl">
                <div className="row">
                    <div className="col d-flex flex-column align-items-center">
                        <img src={image7} className="img img-fluid"/>
                    </div>
                    <div className="col d-flex flex-column align-items-center justify-content-center">
                        <h1>Que hacemos?</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eius soluta voluptates veritatis temporibus ullam accusantium ipsa neque fuga nam expedita vel, totam odit ipsum aut praesentium doloremque, magnam adipisci.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>
     );
}

export default Homepage;