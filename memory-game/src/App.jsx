import Card from './Card.jsx'
import {v4} from 'uuid'
import { useState } from 'react'

const randomNames = [
  "John",
  "Jane",
  "Joe",
  "Jill",
  "Jack",
  "Jim",
  "Jenny",
  "Jerry",
  "Judy",
  "Jeff",
  "Jasmine",
  "Jared",
  "Jocelyn",
  "Javier",
  "Jada",
]


// Idea: This controls the currently picked cards and the ones that are not picked
function App() {
  const [cards, setCards] = useState(randomNames)
  const [picked, setPicked] = useState([])
  const [highScore, setHighScore] = useState(1)

  function shuffleCards() {
    // Shuffle the cards
    cards.sort(() => Math.random() - 0.5)
    setCards(cards)
    // Set high score
    setHighScore(Math.max(picked.length, highScore))
  }

  function pickCard(name) {
    if (picked.includes(name)) {
      // Game over
      alert('Game over!')
      setPicked([])
      shuffleCards()
    } else {
    // Add the name to the picked array
    setPicked([...picked, name])
    shuffleCards()
    // Remove the name from the notPicked array
  }
}

  return (
    <>
    <h1>Memory Game</h1>
    <h2>Score: {picked.length}</h2>
    <h2>High Score: {Math.max(picked.length, highScore)}</h2>
    <div className='card-container'>
      {cards.map((name) => (
        <Card key={v4()} name={name} pickCard={() => {pickCard(name)}} />
      ))}
    </div>
    </>
  )
}

export default App
