import Card from './Card.jsx'
import {v4} from 'uuid'
import { useState, useEffect } from 'react'
import { characterIDs } from './API.js'

// 
const maxCards = 15
// Naruto characters
const randomNames = await characterIDs(maxCards)
// Idea: This controls the currently picked cards and the ones that are not picked
function App() {
  const [cards, setCards] = useState(randomNames)
  const [picked, setPicked] = useState([])
  const [highScore, setHighScore] = useState(1)
  const [mode , setMode] = useState('advanced')

  // Shuffle the cards on mount
  useEffect(() => {
    if (picked.length === randomNames.length) {
      alert('You win!')
      setPicked([])
    } else {
      shuffleCards();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, picked]);


  // Basic: Shuffle the cards
  function shuffleCards() {
    if (mode === 'basic') {
      let newCards = randomNames
      newCards.sort(() => Math.random() - 0.5)
      setCards(newCards)
      setHighScore(Math.max(picked.length, highScore))
    } else {
      shuffleCardsAdvanced()
    }
  }

  // Check if the cards contain at least one un-picked card 
  function verifyShuffle(newCards) {
    let unPicked = randomNames.filter(name => !picked.includes(name))
    for (let i = 0; i < newCards.length; i++) {
      if (unPicked.includes(newCards[i])) {
        return true
      }
    }
    return false
  }


  // Advanced: Create a pot of cards with a mix of picked and not picked cards 
  function shuffleCardsAdvanced() {
    // Total number of cards
    let numCards = 5;
    // Number of picked cards to add in the range from 1 to total number of cards
    let numPicked = Math.floor(Math.random() * (numCards - 1) + 1);
    let newCards = [];
    let unPicked = randomNames.filter(name => !picked.includes(name))
    // When the number of cards in the "pot" is more than the number of picked cards
    if (numPicked > picked.length) {
      newCards = [...picked, ...unPicked.slice(0, Math.abs(numCards - picked.length))]
    } else {
      newCards = [...picked.slice(0, numPicked), ...unPicked.slice(0, numCards - numPicked)]
    }
    if (verifyShuffle(newCards) == true) {
      // Shuffle the new cards
      newCards.sort(() => Math.random() - 0.5)
      setCards(newCards)
      console.log("Picked: ", picked, "Unpicked: ", unPicked, "New Cards: ", newCards)
      // Set high score
      setHighScore(Math.max(picked.length, highScore))  
    } else {
      shuffleCardsAdvanced()
    }
  }

 function changeMode() {
  setMode((prevMode) => (prevMode === 'basic' ? 'advanced' : 'basic'));
  setPicked([]);
}

<button onClick={changeMode}>{mode.toUpperCase()}</button>


  function pickCard(id) {
    if (picked.includes(id)) {
      // Game over
      alert('Game over!')
      setPicked([])
    } else {
    // Add the name to the picked array
    setPicked([...picked, id])
  }
}

  return (
    <>
    <h1>Obliviate!</h1>
    <h2>Score: {picked.length}</h2>
    <h2>High Score: {Math.max(picked.length, highScore)}</h2>
    <button onClick={changeMode}>{mode.toUpperCase()}</button>
    <div className='card-container'>
      {cards.map((id) => (
        <Card key={v4()} char_id={id} pickCard={() => {pickCard(id)}} />
      ))}
    </div>
    </>
  )
}

export default App
