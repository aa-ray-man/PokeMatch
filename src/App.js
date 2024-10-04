import { useState } from 'react';
import './App.css';
import FlipCard from './components/FlipCard';

const cardImages = [
  {"src": "/img/charmander.png"},
  {"src": "/img/bulbasaur.png"},
  {"src": "/img/pikachu.png"},
  {"src": "/img/machop.png"},
  {"src": "/img/gastly.png"},
  {"src": "/img/squirtle.png"}
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(()=> Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}) )
    
    setCards(shuffledCards)
    setTurns(0)
  }

  console.log(cards, turns)

  return (
    <div className="App">

      <h1>PokeMatch</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map((card) => (
          <FlipCard key={card.id} card={card} />
        ))}
      </div>

    </div>
  );
}

export default App;