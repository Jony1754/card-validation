import React from 'react';
import bgimg from '../assets/images/bg-main-desktop.png';
const CardValidation = () => {
  return (
    <>
      <div className='card-container'>
        <section className='card-left'>
          <img src={bgimg} alt='' />
        </section>
        <section className='card-right'>
          <h3>VERIFY YOUR PAYMENT INFO</h3>
          <form action=''>
            <div className='form-group'>
              <label htmlFor='cardNumber'>Card Number</label>
              <input
                type='number'
                className='form-control'
                id='cardNumber'
                placeholder='Card Number'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='cardHolderName'>Card Holder Name</label>
              <input
                type='number'
                className='form-control'
                id='cardHolderName'
                placeholder='Card Holder Name'
              />
            </div>
            <label htmlFor='expiryDate'>EXPIRY DATE</label>
            <div className='form-group date'>
              <div className='date-group'>
                <label htmlFor='expiryDate'>MM</label>
                <input
                  type='number'
                  className='form-control'
                  id='expiryDate'
                  placeholder='MM'
                />
              </div>
              <div className='date-group'>
                <label htmlFor='expiryDate'>YY</label>
                <input
                  type='number'
                  className='form-control'
                  id='expiryDate'
                  placeholder='YY'
                />
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='cvv'>CVV</label>
              <input
                type='text'
                className='form-control'
                id='cvv'
                placeholder='CVV'
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              CONFIRM
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default CardValidation;
