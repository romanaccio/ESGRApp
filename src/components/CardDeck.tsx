import React from 'react';
import { Swipeable, direction } from 'react-deck-swiper';
import MyButton, { MyButtonColor } from './MyButton';
import Heart from '../icons/Heart';
import X from '../icons/X';
import { ArticleInterface } from '../models/Article';
import CardFace from './CardFace';
// import { RenderButtonsPayload } from 'react-deck-swiper/dist/components/SwipeableWrapper';
// import CardButtons from './CardButtons';
export interface CardProps {
  card: ArticleInterface;
  nextCard: ArticleInterface;
  handleSwipe(direction: string, card: ArticleInterface): void;
  legend?: string;
  displayButtons?: boolean;
}

const CardDeck = ({
  card,
  nextCard,
  handleSwipe,
  legend,
  displayButtons = true,
}: CardProps) => {
  const onSwipe = (swipeDirection: direction) => {
    if (handleSwipe) handleSwipe(swipeDirection, card);
  };

  const onButtonSwipe = (swipeDirection: direction) => {
    // FIXME : must find a way to execute the swipe animation

    onSwipe(swipeDirection);
  };

  // renderButtons cannot be used in TypeScript: use CardDeckJS if you want to use it
  /*   const renderButtons = ({ right, left }: RenderButtonsPayload) => (
    <CardButtons right={right} left={left} />
  ); */

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

      <div className='flex justify-between pt-2'>
        {displayButtons ? (
          <MyButton
            icon={<X color='red' />}
            color={MyButtonColor.gray}
            onClick={() => onButtonSwipe(direction.LEFT)}
          ></MyButton>
        ) : null}

        {legend ? <p className='text-center text-xs pt-2'>{legend}</p> : null}
        {displayButtons ? (
          <MyButton
            icon={<Heart color='blue' />}
            color={MyButtonColor.gray}
            onClick={() => onButtonSwipe(direction.RIGHT)}
          ></MyButton>
        ) : null}
      </div>
    </div>
  );
};

export default CardDeck;
