import PropTypes from 'prop-types'
import "./card.css"

// Card: {Image, Name}
function Card({name, pickCard=()=>{}}) {
    return (<div className="card" onClick={pickCard}>
                <div className="card-image">
                    <img src="https://via.placeholder.com/150" alt="placeholder" />
                </div>
                <div className="card-name">
                    {name}
                </div>
            </div>)
}
Card.propTypes = {
    name: PropTypes.string.isRequired,
    pickCard: PropTypes.func
}

export default Card;