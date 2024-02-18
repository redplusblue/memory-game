import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';
import "../css/card.css"

const API = "https://hp-api.onrender.com/api/character/:id";
// "API"
async function getInfo(id) {
    const URL = API.replace(":id", id)
    let response = await fetch(URL)
    let data = await response.json()
    return data[0]
}

// Card: {Image, Name}
function Card({char_id, pickCard=()=>{}}) {
    let [info, setInfo] = useState({name: "Loading...", image: "https://via.placeholder.com/250"})
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await getInfo(char_id);
            setInfo(data);
        };

        fetchData();
    }, [char_id]);

    return (<div className={"card " + info.house} onClick={pickCard}>
                <div className="card-image">
                    <img src={info.image || "https://via.placeholder.com/250"} alt="placeholder" />
                </div>
                <div className="card-name">
                    {info.name}
                </div>
            </div>)
}
Card.propTypes = {
    char_id: PropTypes.string.isRequired,
    pickCard: PropTypes.func
}

export default Card;