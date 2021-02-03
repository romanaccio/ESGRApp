import React from 'react';

export enum BoxBorder {
  none,
  left,
  full,
}

export interface BoxInterface {
  title?: string;
  children?: any;
  border?: BoxBorder;
  color?: boolean;
}

const Box = ({
  title = '',
  children,
  border = BoxBorder.none,
  color = true,
}: BoxInterface) => {
  let decoration = `shadow-xl p-6 max-w-5xl mx-auto rounded-t-lg flex items-center space-x-4 border-indigo-500`;
  if (color) decoration += ' bg-indigo-50';
  else decoration += ' bg-white';
  if (border === BoxBorder.full) decoration += ' border-2';
  else if (border === BoxBorder.left) decoration += ' border-l-2';
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
