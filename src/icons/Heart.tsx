import React from 'react';
interface HeartInterface {
  color?: string;
}

const Heart = ({ color = 'currentColor' }: HeartInterface) => {
  return (
    <svg
      className='w-6 h-6'
      fill={color}
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
        clipRule='evenodd'
      />
    </svg>
  );
};

export default Heart;
