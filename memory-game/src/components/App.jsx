import Card from './Card.jsx'
import {v4} from 'uuid'
import { useState, useEffect } from 'react'
import { characterIDs } from '../scripts/API.js'

const maxCards = 25;
let randomNames;

function App() {
  const [cards, setCards] = useState([])
  const [picked, setPicked] = useState([])
  const [unPicked, setUnPicked] = useState([])
  const [highScore, setHighScore] = useState(0)
  const [mode , setMode] = useState('basic')

  // Only runs on mount
  useEffect(() => {
    async function fetchData() {
      randomNames = await characterIDs(maxCards);
      setCards(randomNames);
      setUnPicked(randomNames);
    }

    fetchData();
  }, []);

  // Runs when picked or mode changes
  useEffect(() => {
    if (unPicked.length === 0 && picked.length === maxCards) {
      endGame('win')
    } else {
      shuffleCards();
    }
    setHighScore(Math.max(picked.length, highScore))
  // Didn't want to add shuffleCards to the dependency array
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, picked]);

  function shuffleCards() {
    if (mode === 'basic') {
      let newCards = cards
      newCards.sort(() => Math.random() - 0.5)
      setCards(newCards)
    } else {
      shuffleCardsAdvanced()
    }
  }

  // Advanced: Create a pot of cards with a mix of picked and not picked cards 
  function shuffleCardsAdvanced() {
    // Total number of cards we want to display at a time in the range from 5 to 10 
    let numCards = Math.floor(Math.random() * (10 - 5 + 1) + 5);

    // Sprinkle some random number of picked cards in the pot
    let numPicked = Math.floor(Math.random() * (picked.length - 1) + 1);
    let newCards = [];
    if (numCards > numPicked) {
      numCards -= numPicked
      newCards = picked.slice(0, numPicked)
      newCards.push(...unPicked.slice(0, numCards))
    } else {
      newCards = picked.slice(0, numCards - 1)
      // Add one unpicked card to the pot
      newCards.push(unPicked[Math.floor(Math.random() * unPicked.length)])
    }
    // Shuffle the pot
    newCards.sort(() => Math.random() - 0.5)    
    setCards(newCards)
  }

 function changeMode() {
  setMode((prevMode) => (prevMode === 'basic' ? 'advanced' : 'basic'));
  setPicked([]);
  setUnPicked(randomNames);
}

function pickCard(id) {
    if (picked.includes(id)) {
      endGame('lose')
    } else {
    setPicked([...picked, id])
    setUnPicked(unPicked.filter((name) => name !== id))
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
  setUnPicked(randomNames)
  document.querySelector('.card-container').classList.remove('hide')
  document.querySelector('.message').querySelector('p').textContent = ''
  document.querySelector('.message').querySelector('.btn').classList.add('hide')
}

function startGame() {
  document.querySelectorAll('.dissapear').forEach((el) => {
    el.classList.remove('dissapear')
  })
  document.querySelector('.card-container').classList.remove('hide')
  document.querySelector('.message').querySelector('p').textContent = ''
  document.querySelector('.play-btn').remove()
}
  
  return (
    <>
    <nav>
    <div className='score dissapear'>
      <div>Score: {picked.length}</div>
      <div>High Score: {Math.max(picked.length, highScore)}</div>
    </div>
    <h1>Obliviate!</h1>
    <div className='difficulty dissapear'>
      <label>Difficulty Level: </label>
      <button className='btn' onClick={changeMode}>{mode.toUpperCase()}</button>
    </div>
    </nav>
    <div className='card-container hide'>
      {cards.map((id) => (
        <Card key={v4()} char_id={id} pickCard={() => {pickCard(id)}} />
      ))}
    </div>
    <div className='message'>
      <p>Hello!<br></br>
      This is a simple memory game. The goal is to pick all the cards without picking the same card twice. <br></br>
      </p>
      <button className='btn play-btn' onClick={startGame}>Play?</button>
      <button className='btn hide' onClick={resetGame}>Play Again?</button>
    </div>
    <footer>
      Made with <span role='img' aria-label='heart'>❤️</span> by <a href='https://github.com/redplusblue'>Samir</a> using <a href='https://reactjs.org/'>React</a> and <a href='https://hp-api.onrender.com/'>Harry Potter API</a> 
    </footer>
    </>
  )
}

export default App
