import { getEvents } from '../../../libs/requests/events-requests';
import { useState, useEffect } from 'react';

import NavBar from './../components/NavBar';
import Footer from './../components/Footer';
import { HorizontalCard } from '../../public-components/Card';
import Modal from '../../public-components/Modal';

export default function Events(){
    const [events, setEvents] = useState([{}]);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

    const getEventsHandler = async () => {
        const response = await getEvents();
        setEvents(response);
    }

    useEffect(() => {
        document.title = "Eventos"
        getEventsHandler()
    }, [])

    return (
        <>  
            <Modal style={{width: '90vw',height: '80vh'}} visible={modalVisible} handleClose={() => setModalVisible(false)}>
                <div className="container d-flex flex-column align-items-center justify-content-between" >
                    {selectedEvent.image? 
                        <img 
                            src={selectedEvent.image.url} 
                            style={{width: '100%', height: '200px', objectFit: 'cover'}} 
                        />
                    : ''}
                    <div style={{overflowY: 'auto', width: '100%', height: '50vh'}} >
                        <h4>{selectedEvent.title}</h4>
                        <p style={{wordBreak: 'break-word', display: 'inline-block'}}>{selectedEvent.description}</p>
                    </div>
                </div>
            </Modal>

            <NavBar/>
                <h1 className="container">Nuestros eventos</h1>
                <div className="container d-flex flex-row flex-wrap align-items-center justify-content-evenly">
                    {events.map((event, index) => <HorizontalCard 
                        onClick={() => {
                            setSelectedEvent(event)
                            setModalVisible(true)
                        }}
                        key={index} 
                        title={event.title} 
                        content={event.description}
                        image={event.image? event.image.url : ''}
                    />)}
                </div>
            <Footer/>
        </>
    )
}