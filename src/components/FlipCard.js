import React, { useState } from 'react';
import styled from 'styled-components';

const FlipCardContainer = styled.div`
  background-color: transparent;
  width: 256px;
  height: 384px;
  perspective: 1000px;
  cursor: pointer;
`;

const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'none'};
`;

const FlipCardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const FlipCardFront = styled(FlipCardSide)`
  transform: rotateY(180deg);
`;

const FlipCardBack = styled(FlipCardSide)`
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

export default function FlipCard({card, handleChoice}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    handleChoice(card)
  };

  return (
    <FlipCardContainer>
      <FlipCardInner isFlipped={isFlipped}>
        <FlipCardBack>
          <CardImage
            src="/img/card-back.png"
            alt="Card Back"
            onClick={handleClick}
          />
        </FlipCardBack>
        <FlipCardFront>
          <CardImage
            src= {card.src}
            alt="Card Front"
          />
        </FlipCardFront>
      </FlipCardInner>
    </FlipCardContainer>
  );
}