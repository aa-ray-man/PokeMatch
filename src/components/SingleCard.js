import React from 'react'

export default function SingleCard({card}) {
  return (
  <div className='card'>
    <img className='front' src={card.src} alt='card front'/>
    <img className='back' src="/img/card-back.png" alt='card back'/>
  </div>
  )
}
