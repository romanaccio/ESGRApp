import React from 'react';
import Box from './Box';
import { Swipeable, direction } from 'react-deck-swiper';
import MyButton from './MyButton';
import Heart from '../icons/Heart';
import X from '../icons/X';
import CardButtons from './CardButtons';

export interface CardInterface {
  image_url: string;
  title: string;
  content: string;
}

export interface CardProps {
  obj: CardInterface;
  handleSwipe(direction: string): void;
}

const Card = ({ obj, handleSwipe }: CardProps) => {
  const onSwipe = (swipeDirection: direction) => {
    if (swipeDirection === direction.RIGHT) {
      // handle right swipe
      console.log('right swipe');
      handleSwipe(swipeDirection);
      return;
    }

    if (swipeDirection === direction.LEFT) {
      // handle left swipe
      console.log('left swipe');
      handleSwipe(swipeDirection);

      return;
    }
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
        <img
          // className='min-h-10 min-w-12 max-h-full max-w-full object-cover'
          style={{ width: '600px', height: '400px' }}
          className='object-cover'
          src={obj.image_url}
          alt={obj.title}
        />
        <div className='absolute bottom-1'>
          <Swipeable
            onSwipe={onSwipe}
            /* renderButtons={renderButtons} */
          >
            <Box title={obj.title} fullBorder={true}>
              <div className='text-xs overflow-y-scroll'>{obj.content}</div>
            </Box>
          </Swipeable>
        </div>
      </div>

      <div className='flex justify-between'>
        <MyButton
          icon={<X color='red' />}
          color='white'
          onClick={() => onButtonSwipe(direction.LEFT)}
        ></MyButton>
        <MyButton
          icon={<Heart color='green' />}
          color='white'
          onClick={() => onButtonSwipe(direction.RIGHT)}
        ></MyButton>
      </div>
    </div>
  );
};

export default Card;
