import React from 'react';
import { ArticleInterface } from '../models/Article';

export interface CardFaceProps {
  card: ArticleInterface;
}

const CardFace = ({ card }: CardFaceProps) => {
  return (
    <div className='relative select-none'>
      <img
        style={{ height: '480px' }}
        className='object-cover rounded-xl w-80 pointer-events-none'
        src={card.image_url}
        alt={card.title}
      />
      <div className='absolute bottom-0 px-4 mx-4 bg-white rounded-t-lg overflow-auto h-40 '>
        <div className='font-sans font-bold text-justify text-sm  h1/3 pt-1'>
          {card.title}
        </div>
        <div className='text-xs h-2/3 text-justify pt-1'>{card.content}</div>
      </div>
    </div>
  );
};

export default CardFace;
