import React, { useRef } from 'react';
import { formats, numberValidation } from '../utils/cardFormater';
import bgimg from '../assets/images/bg-main-desktop.png';
import Card from '../components/Card';
import front from '../assets/images/bg-card-front.png';
const CardValidation = () => {
  const cardRef = useRef(0);
  const [card, setCard] = React.useState({});
  const onChange = (e) => {
    setCard({
      ...card,
      [e.target.name]: e.target.value,
    });
  };
  console.log({ ...card });
  return (
    <>
      <div className='card-container'>
        <section className='card-left'>
          <img src={bgimg} alt='' className='card-left__background' />
          <Card image={front} num={card.cardNumber || 'XXXXXXXXXXXXXXXX'} />
        </section>
        <section className='card-right'>
          <form action=''>
            <h1 className='verify'>Verify your payment info</h1>
            <div className='form-group'>
              <label htmlFor='cardNumber'>Card Number</label>
              <input
                type='text'
                className='form-control'
                id='cardNumber'
                placeholder='Card Number'
                name='cardNumber'
                ref={cardRef}
                onChange={onChange}
                onKeyPress={(e) => {
                  console.log('e on key press: ', e);
                  formats(e.target, e);
                }}
                onKeyUp={(e) => numberValidation(e)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='cardHolderName'>Card Holder Name</label>
              <input
                type='text'
                className='form-control'
                id='cardHolderName'
                placeholder='Your name here'
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
                  placeholder='02'
                />
              </div>
              <div className='date-group'>
                <label htmlFor='expiryDate'>YY</label>
                <input
                  type='number'
                  className='form-control'
                  id='expiryDate'
                  placeholder='2027'
                />
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='cvv'>CVV</label>
              <input
                type='text'
                className='form-control'
                id='cvv'
                placeholder='262'
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
