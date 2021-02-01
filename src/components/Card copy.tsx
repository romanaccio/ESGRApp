import React, { useRef } from 'react';
import Box from './Box';
import TinderCard from 'react-tinder-card';
import MyButton from './MyButton';
import Heart from '../icons/Heart';
import X from '../icons/X';

export interface CardInterface {
  id: number;
  title: string;
  url: string;
}

export interface CardProps {
  obj: CardInterface;
  handleSwipe(direction: string): void;
}

const Card = ({ obj, handleSwipe }: CardProps) => {
  // const myRef = useRef<HTMLDivElement>(null);

  const onSwipe = (direction: string) => {
    console.log('You swiped: ' + direction);
    handleSwipe(direction);
  };

  const onButtonSwipe = (direction: string) => {
    // FIXME : must find a way to call the swipe function inside the TinderCard
    /* const node = myRef.current;
    if (node) node.swipe(direction); */
    onSwipe(direction);
  };

  return (
    <div className='my-1 max-w-sm'>
      <div className='relative'>
        <img
          className='h-full w-full object-cover'
          src={obj.url}
          alt={obj.title}
        />
        <div className='absolute bottom-1'>
          <TinderCard
            /* ref={myRef} */
            onSwipe={onSwipe}
            preventSwipe={['up', 'down']}
          >
            <Box title={obj.title} fullBorder={true}>
              <p>{`id: ${obj.id}`}</p>
              <p>{`title: ${obj.title}`}</p>
            </Box>
          </TinderCard>
        </div>
      </div>

      <div className='flex justify-between'>
        <MyButton
          icon={<X color='red' />}
          color='white'
          onClick={() => onButtonSwipe('left')}
        ></MyButton>
        <MyButton
          icon={<Heart color='green' />}
          color='white'
          onClick={() => onButtonSwipe('right')}
        ></MyButton>
      </div>
    </div>
  );
};

export default Card;
