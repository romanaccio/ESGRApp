import React from 'react';

export interface ESGRBoxInterface {
  title?: string;
  children?: any;
}

const ESGRBox = ({ title = '', children }: ESGRBoxInterface) => {
  let decoration =
    'shadow-xl p-6 min-w-full max-w-5xl mx-auto rounded-t-lg flex items-center space-x-4 bg-white';
  return (
    <div className={decoration}>
      <div className='flex-shrink overflow-x-auto mx-auto'>
        <p className='text-2xl shadow text-center'>{title}</p>
        {children}
      </div>
    </div>
  );
};

export default ESGRBox;
