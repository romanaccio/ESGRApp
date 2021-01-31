import React from 'react';
import Box from './Box';
import TinderCard from 'react-tinder-card';
import Avatar from './Avatar';
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
  const onSwipe = (direction: string) => {
    console.log('You swiped: ' + direction);
    handleSwipe(direction);
  };

  return (
    <div className='relative my-1 max-w-sm'>
      <img
        className='h-full w-full object-cover'
        src={obj.url}
        alt={obj.title}
      />
      <div className='absolute bottom-0'>
        <TinderCard onSwipe={onSwipe} preventSwipe={['up', 'down']}>
          <Box title={obj.title} fullBorder={true}>
            <p>{`id: ${obj.id}`}</p>
            <p>{`title: ${obj.title}`}</p>
            {/* <Avatar username={obj.title} photoURL={obj.url} small={false} /> */}
          </Box>
        </TinderCard>
      </div>
    </div>
  );
};

export default Card;
