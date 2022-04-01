import { useEffect, useState } from "react";
import { getContests } from "../../../libs/requests/contests-requests";
import { useNavigate } from 'react-router-dom';

import { VerticalCard } from "../../public-components/Card";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Contests(){
    const [contests, setContests] = useState([{image: ''}]);
    const navigate = useNavigate();

    const getContestsHandler = async () => {
        const response = await getContests();
        setContests(response);
    }

    useEffect(() =>{
        document.title = "Competencias"
        getContestsHandler()
    }, [])

    return <>
        <NavBar/>
        <div className="container d-flex flex-wrap align-items-center justify-content-evenly">
            {contests.map((contest, index) => <VerticalCard 
                onClick={() => navigate(`/contests/${contest._id}`)}
                key={index}
                title={contest.title} 
                image={contest.image? contest.image.url : '' }
                content={contest.description}
            />)}
        </div>
        <Footer/>
    </>
}