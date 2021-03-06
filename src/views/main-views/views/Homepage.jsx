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

    const [sliderImages, setSliderImages] = useState([
        <Slide title="La mejor carne" image={image1}/>,
        <Slide title="Alta calidad" content="Disfruta unas exquisitas costillas" image={image2}/>,
        <Slide slideTitle="La mejor carne" image={image3}/>,
    ]);

    
    const getLastTwoEventsHandler = async () => {
        const response = await getEventsPaginated(2,'last')
        if(response.length > 0){
            setSliderImages([...sliderImages, 
                <Slide 
                    title={response[0].title} 
                    alignment="start"
                    content={response[0].description} 
                    image={response[0].image.url}
                />,
                <Slide 
                    title={response[1].title} 
                    alignment='end'
                    content={response[1].description} 
                    image={response[1].image.url}
                />
            ])
        }
    }

    useEffect(() => {
        document.title = "Los santos de la parrilla"
        getLastTwoEventsHandler()
    }, [])

    return ( 
    <>
        <NavBar/>
        <Slider slides={sliderImages}/>
        <div className="main-wraper">
            <div className="container-xl">
                <div className="d-flex flex-row align-items-center justify-content-center flex-wrap mb-4">
                    <div
                        style={{ minWidth: 250, width: '500px'}} 
                        className="d-flex flex-column align-items-center justify-content-center text-center">
                        <h1>Qui??nes somos?</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eius soluta voluptates veritatis temporibus ullam accusantium ipsa neque fuga nam expedita vel, totam odit ipsum aut praesentium doloremque, magnam adipisci.
                        </p>
                    </div>
                        <img src={image6} className="home-section-img"/>
                </div>
            </div>
            <div className="container-xl">
                <div className="d-flex flex-row align-items-center justify-content-center flex-wrap mb-4">
                        <img src={image7} className="home-section-img"/>
                    <div 
                        style={{ minWidth: 250, width: '500px'}} 
                        className="d-flex flex-column align-items-center justify-content-center text-center"
                    >
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