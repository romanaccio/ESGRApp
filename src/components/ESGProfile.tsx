import React from 'react';
import { CardInterface } from './Card';
import Box from './Box';
import { LinearProgress } from '@material-ui/core';
export interface ESGProfileProps {
  selectedCards: CardInterface[];
}

const ESGProfile = ({ selectedCards }: ESGProfileProps) => {
  const lambda = 0.75;
  console.log('lambda = ' + lambda);
  let averageGrade = 0;
  const n = selectedCards.length;
  if (n > 0)
    averageGrade =
      selectedCards.reduce(
        (accumulator, currentValue, index) =>
          accumulator +
          currentValue.grade *
            currentValue.choice *
            Math.pow(lambda, n - 1 - index),
        0
      ) /
      selectedCards.reduce(
        (accumulator, currentValue, index) =>
          accumulator +
          Math.abs(
            currentValue.grade *
              currentValue.choice *
              Math.pow(lambda, n - 1 - index)
          ),
        0
      );
  return (
    <div className='p-5'>
      {/*     <Box color={false}> */}
      <div className='flex space-x-4'>
        {averageGrade >= 0 ? (
          <>
            <div className='flex-1 w-1/2 transform rotate-180'>
              <LinearProgress
                variant='determinate'
                value={0}
                color='secondary'
              />
            </div>
            <div className='flex-1 w-1/2'>
              <LinearProgress
                variant='determinate'
                value={averageGrade * 100}
              />
            </div>
          </>
        ) : (
          <>
            <div className='flex-1 transform rotate-180'>
              <LinearProgress
                variant='determinate'
                value={-averageGrade * 100}
                color='secondary'
              />
            </div>
            <div className='flex-1'>
              <LinearProgress variant='determinate' value={0} />
            </div>
          </>
        )}
      </div>
      {/*   </Box> */}
    </div>
  );
};

export default ESGProfile;
