import React from 'react';
import { ArticleInterface } from '../models/Article';
import { calculateScore } from '../util/calculateScore';

// import Box from './Box';
import { BorderLinearProgress } from './BiggerLinearProgress';
export interface ESGProfileProps {
  selectedCards: ArticleInterface[];
}

const ESGProfile = ({ selectedCards }: ESGProfileProps) => {
  const score = calculateScore(selectedCards);
  return (
    <div className='p-5'>
      {/*     <Box color={false}> */}
      <div className='flex space-x-4'>
        {score >= 0 ? (
          <>
            <div className='flex-1 w-1/2 transform rotate-180'>
              <BorderLinearProgress
                variant='determinate'
                value={0}
                color='secondary'
              />
            </div>
            <div className='flex-1 w-1/2'>
              <BorderLinearProgress variant='determinate' value={score * 100} />
            </div>
          </>
        ) : (
          <>
            <div className='flex-1 transform rotate-180'>
              <BorderLinearProgress
                variant='determinate'
                value={-score * 100}
                color='secondary'
              />
            </div>
            <div className='flex-1'>
              <BorderLinearProgress variant='determinate' value={0} />
            </div>
          </>
        )}
      </div>
      {/*   </Box> */}
    </div>
  );
};

export default ESGProfile;
