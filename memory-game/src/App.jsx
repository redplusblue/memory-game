import Card from './Card.jsx'
import {v4} from 'uuid'

const randomNames = [
  "John",
  "Jane",
  "Joe",
  "Jill",
  "Jack",
  "Jim"
]
// Idea: This controls the currently picked cards and the ones that are not picked
function App() {
  return (
    // Map random names to a card component
    <div className='card-container'>
      {randomNames.map((name) => (
        <Card name={name} key={v4()} />
      ))}
    </div>
  )
}

export default App
