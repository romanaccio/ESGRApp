import React from 'react';

export default function CardButtons({ right, left }) {
  return (
    <div>
      Left <button onClick={left} />
      Right <button onClick={right} />
    </div>
  );
}
