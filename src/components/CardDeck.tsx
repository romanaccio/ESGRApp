import React from 'react';
import { Swipeable, direction } from 'react-deck-swiper';
import MyButton, { MyButtonColor } from './MyButton';
import Heart from '../icons/Heart';
import X from '../icons/X';
import { ArticleInterface } from '../models/Article';
import CardFace from './CardFace';

export interface CardProps {
  card: ArticleInterface;
  nextCard: ArticleInterface;
  handleSwipe?(direction: string): void;
}

const CardDeck = ({ card, nextCard, handleSwipe }: CardProps) => {
  const onSwipe = (swipeDirection: direction) => {
    if (handleSwipe) handleSwipe(swipeDirection);
  };

  const onButtonSwipe = (swipeDirection: direction) => {
    // FIXME : must find a way to call the swipe function inside the TinderCard

    onSwipe(swipeDirection);
  };

  // const renderButtons = ({ right, left }) => (
  //   <CardButtons right={right} left={left} />
  // );

  return (
    <div className='my-1 max-w-xl'>
      <div className='relative'>
        <CardFace card={nextCard} />
        <div className='absolute bottom-0'>
          <Swipeable
            onSwipe={onSwipe}
            fadeThreshold={150}
            /* renderButtons={renderButtons} */
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
          icon={<Heart color='green' />}
          color={MyButtonColor.gray}
          onClick={() => onButtonSwipe(direction.RIGHT)}
        ></MyButton>
      </div>
    </div>
  );
};

export default CardDeck;
