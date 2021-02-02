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
      <Swipeable
        onSwipe={onSwipe}
        fadeThreshold={200}
        /* renderButtons={renderButtons} */
      >
        <div className='relative'>
          <img
            style={{ width: '600px', minHeight: '500px' }}
            className='object-cover'
            src={obj.image_url}
            alt={obj.title}
          />
          <div className='absolute bottom-1'>
            <Box title={obj.title} fullBorder={true}>
              <div className='text-xs overflow-y-scroll'>{obj.content}</div>
            </Box>
          </div>
        </div>
      </Swipeable>

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
