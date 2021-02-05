import React from 'react';
import { Swipeable, direction } from 'react-deck-swiper';
import MyButton, { MyButtonColor } from './MyButton';
import Heart from '../icons/Heart';
import X from '../icons/X';
import CardFace from './CardFace';
import CardButtons from './CardButtons';

// this is a JavaScript version of CardDeck.tsx
// renderButtons works but doesn't do what I want: do the swipe animation
const CardDeckJS = ({ card, nextCard, handleSwipe }) => {
  const onSwipe = (swipeDirection) => {
    if (handleSwipe) handleSwipe(swipeDirection);
  };

  const onButtonSwipe = (swipeDirection) => {
    onSwipe(swipeDirection);
  };

  const renderButtons = ({ right, left }) => (
    <CardButtons right={right} left={left} />
  );

  return (
    <div className='my-1 max-w-xl'>
      <div className='relative'>
        <CardFace card={nextCard} />
        <div className='absolute bottom-0'>
          <Swipeable
            // renderButtons={renderButtons}
            onSwipe={onSwipe}
            fadeThreshold={150}
          >
            <CardFace card={card} />
          </Swipeable>
        </div>
      </div>

      <div className='flex justify-between'>
        <MyButton
          icon={<X color='red' />}
          color={MyButtonColor.gray}
          onClick={() => onButtonSwipe(direction.LEFT)}
        ></MyButton>
        <MyButton
          icon={<Heart color='blue' />}
          color={MyButtonColor.gray}
          onClick={() => onButtonSwipe(direction.RIGHT)}
        ></MyButton>
      </div>
    </div>
  );
};

export default CardDeckJS;
