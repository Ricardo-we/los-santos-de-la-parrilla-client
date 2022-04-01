import { useState, useEffect } from "react";
import { getContest } from "../../../libs/requests/contests-requests";
import { useParams } from "react-router-dom";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function ContestDetail(){
    const [contest, setContest] = useState({image: ''});
    const { id } = useParams();

    const getContestHandler = async () => {
        const response = await getContest(id);
        setContest(response)
    }

    useEffect(() => {
        getContestHandler()
    }, [])

    return <>
        <NavBar/>
        <div className="container">
            {contest.image ? 
                <img src={contest.image.url} className="img-fluid" style={styles.imageStyle} /> 
            : 
                null
            }
            <h1>{contest.title}</h1>
            <p>{contest.description}</p>
        </div>

        <Footer/>
    </>
}

const styles = {
    imageStyle: {
        maxHeight: '450px', 
        objectFit: 'cover', 
        width: '100%'
    }
}