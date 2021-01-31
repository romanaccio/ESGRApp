import React from 'react';
import Box from './Box';
export interface ToDoInterface {
  id: number;
  title: string;
  completed: boolean;
}

export interface ToDoProps {
  obj: ToDoInterface;
}

const ToDo = ({ obj }: ToDoProps) => {
  return (
    <div className='my-1'>
      <Box title={obj.title} fullBorder={true}>
        <p>{`id: ${obj.id}`}</p>
        <p>{`title: ${obj.title}`}</p>
        <p>{`completed: ${obj.completed}`}</p>
      </Box>
    </div>
  );
};

export default ToDo;
