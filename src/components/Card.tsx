import React from 'react';
import ESGRBox from './ESGRBox';
import { Swipeable, direction } from 'react-deck-swiper';
import MyButton, { MyButtonColor } from './MyButton';
import Heart from '../icons/Heart';
import X from '../icons/X';
import cardBack from '../img/card_back.png';
import { ArticleInterface } from '../models/Article';

export const defaultCard: ArticleInterface = {
  id: 'xxx',
  image_url: cardBack,
  title: 'You have reviewed all cards',
  content: 'Please check your score below',
  grade: 0,
  choice: 0,
};

export interface CardProps {
  obj: ArticleInterface;
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
            style={{ height: '450px' }}
            className='object-cover rounded-xl w-80'
            src={obj.image_url}
            alt={obj.title}
          />
          <div className='absolute bottom-0 px-4 mx-4 bg-white rounded-t-lg overflow-auto h-40 '>
            <div className='text-xl shadow text-center h1/3 overflow-auto'>
              {obj.title}
            </div>
            <div className='text-xs h-2/3 overflow-auto'>{obj.content}</div>
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
