import React from 'react';

const Card = ({ image, num }) => {
  return (
    <div className='card'>
      <div className='blobs'>
        <div className='filledblob'></div>
        <div className='outlinedblob'></div>
      </div>
      <img src={image} alt='' />
      <p className='card-number'>{num}</p>
      <div className='card-data'>
        <p className='card-name'>Jonathan Arias</p>
        <p className='card-date'>10 | 28</p>
      </div>
    </div>
  );
};

export default Card;
