import { useEffect, useState } from 'react';
import './App.css';
import FlipCard from './components/FlipCard';

const cardImages = [
  {"src": "/img/charmander.png", matched: false},
  {"src": "/img/bulbasaur.png", matched: false},
  {"src": "/img/pikachu.png", matched: false},
  {"src": "/img/machop.png", matched: false},
  {"src": "/img/gastly.png", matched: false},
  {"src": "/img/squirtle.png", matched: false}
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const[choiceOne, setChoiceOne] = useState(null)
  const[choiceTwo, setChoiceTwo] = useState(null)


  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(()=> Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}) )
    
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare 2 selected cards
  useEffect(() => {
    if(choiceOne && choiceTwo){

      if (choiceOne.src === choiceTwo.src){
        
        setCards(prevCards => {
          prevCards.map(card => {
            if (card.src === choiceOne.src){
              return {...card, matched: true}
            }else {
              return card 
            }
          })
        })
      
        resetTurn()
        
      }else {
        console.log("cards dont match")
        resetTurn()
      }
    }
  }, [choiceOne, choiceTwo])

  //update the turn and choices
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns+1)
  }

  return (
    <div className="App">

      <h1>PokeMatch</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map((card) => (
          <FlipCard key={card.id} card={card} handleChoice={handleChoice} />
        ))}
      </div>

    </div>
  );
}

export default App;