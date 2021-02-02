import React from 'react';

export interface BoxInterface {
  title: string;
  children?: any;
  fullBorder?: boolean;
}

const Box = ({ title = '', children, fullBorder = false }: BoxInterface) => {
  let decoration = `p-6 max-w-5xl mx-auto bg-indigo-50 rounded-xl flex items-center space-x-4 border-indigo-500`;
  if (fullBorder) decoration += ' border-2';
  else decoration += ' border-l-2';
  return (
    <div className={decoration}>
      <div className='flex-shrink overflow-x-auto mx-auto'>
        <p className='text-2xl shadow text-center'>{title}</p>
        {children}
      </div>
    </div>
  );
};

export default Box;
