import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

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
  const[disabled, setDisabled] = useState(false)


  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(()=> Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}) )
    
    setChoiceOne(null)
    setChoiceTwo(null)
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
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src){
        
        setCards(prevCards => {
          return  prevCards.map(card => {
            if (card.src === choiceOne.src){
              return {...card, matched: true}
            }else {
              return card 
            }
          })
        })
      
        resetTurn()
        
      }else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  //update the turn and choices
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns+1)
    setDisabled(false)
  }

  //automaticaky start the game 
  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <div className="App">

      <h1>PokeMatch</h1>
      <button onClick={shuffleCards}>New Game</button>
      <p>
        <b>Turns Taken: {turns}</b>
      </p>

      <div className='card-grid'>
        {cards.map((card) => (
          <SingleCard
          key={card.id} 
          card={card} 
          handleChoice={handleChoice}
          flipped= {card === choiceOne || card === choiceTwo || card.matched}
          disabled= {disabled} />
        ))}
      </div>

    </div>
  );
}

export default App;