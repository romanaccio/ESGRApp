import React from 'react';
import Box from './Box';
import { Swipeable, direction } from 'react-deck-swiper';
import MyButton, { MyButtonColor } from './MyButton';
import Heart from '../icons/Heart';
import X from '../icons/X';
import cardBack from '../img/card_back.png';

export interface CardInterface {
  id: string;
  image_url: string;
  title: string;
  content: string;
  grade: number;
  choice: number;
}

export const defaultCard: CardInterface = {
  id: 'xxx',
  image_url: cardBack,
  title: 'No more cards',
  content: '------------Please review your score below-------------',
  grade: 0,
  choice: 0,
};

export interface CardProps {
  obj: CardInterface;
  handleSwipe?(direction: string): void;
}

const Card = ({ obj, handleSwipe }: CardProps) => {
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
      <Swipeable
        onSwipe={onSwipe}
        fadeThreshold={150}
        /* renderButtons={renderButtons} */
      >
        <div className='relative'>
          <img
            style={{ width: '400px', minHeight: '500px' }}
            className='object-cover rounded-xl'
            src={obj.image_url}
            alt={obj.title}
          />
          <div className='absolute bottom-0 px-4 '>
            <Box title={obj.title} color={false}>
              <div className='text-xs overflow-y-scroll'>{obj.content}</div>
            </Box>
          </div>
        </div>
      </Swipeable>

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

export default Card;
