import Card from './Card.jsx'
import {v4} from 'uuid'
import { useState, useEffect } from 'react'
import { characterIDs } from './API.js'

// 
const maxCards = 24
// Naruto characters
const randomNames = await characterIDs(maxCards)
// Idea: This controls the currently picked cards and the ones that are not picked
function App() {
  const [cards, setCards] = useState(randomNames)
  const [picked, setPicked] = useState([])
  const [highScore, setHighScore] = useState(1)
  const [mode , setMode] = useState('basic')

  // Shuffle the cards on mount
  useEffect(() => {
    if (picked.length === randomNames.length) {
      endGame('win')
    } else {
      shuffleCards();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, picked]);


  // Basic: Shuffle the cards
  function shuffleCards() {
    if (mode === 'advanced') {
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

function pickCard(id) {
    if (picked.includes(id)) {
      endGame('lose')
    } else {
    // Add the name to the picked array
    setPicked([...picked, id])
  }
}

function endGame(cond) {
  document.querySelector('.card-container').classList.add('hide')
  const message = document.querySelector('.message');
  const messageText = message.querySelector('p')
  if (cond === 'win') {
    messageText.textContent = 'You won!'
  } else {
    messageText.textContent = 'You lost!'
  }
  message.querySelector('.btn').classList.remove('hide')
}

function resetGame() {
  setPicked([])
  document.querySelector('.card-container').classList.remove('hide')
  document.querySelector('.message').querySelector('p').textContent = ''
  document.querySelector('.message').querySelector('.btn').classList.add('hide')
}
  

  return (
    <>
    <nav>
    <div className='score'>
      <div>Score: {picked.length}</div>
      <div>High Score: {Math.max(picked.length, highScore)}</div>
    </div>
    <h1>Obliviate!</h1>
    <div className='difficulty'>
      <label>Difficulty Level: </label>
      <button className='btn' onClick={changeMode}>{mode.toUpperCase()}</button>
    </div>
    </nav>
    <div className='card-container'>
      {cards.map((id) => (
        <Card key={v4()} char_id={id} pickCard={() => {pickCard(id)}} />
      ))}
    </div>
    <div className='message'>
      <p></p>
      <button className='btn hide' onClick={resetGame}>Play Again?</button>
    </div>
    <footer>
      Made with <span role='img' aria-label='heart'>💜</span> by <a href='https://github.com/redplusblue'>Samir</a> using <a href='https://reactjs.org/'>React</a> and <a href='https://hp-api.onrender.com/'>Harry Potter API</a> 
    </footer>
    </>
  )
}

export default App
