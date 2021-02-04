import React from 'react';
import { ArticleInterface } from '../models/Article';

export interface CardFaceProps {
  card: ArticleInterface;
}

const CardFace = ({ card }: CardFaceProps) => {
  return (
    <div className='relative select-none'>
      <img
        style={{ height: '500px' }}
        className='object-cover rounded-xl w-80 pointer-events-none'
        src={card.image_url}
        alt={card.title}
      />
      <div className='absolute bottom-0 px-4 mx-4 bg-white rounded-t-lg overflow-auto h-40 '>
        <div className='text-xl shadow text-center h1/3 overflow-auto'>
          {card.title}
        </div>
        <div className='text-xs h-2/3 overflow-auto'>{card.content}</div>
      </div>
    </div>
  );
};

export default CardFace;
