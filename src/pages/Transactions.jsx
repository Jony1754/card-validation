import React from 'react';
import '../scss/transactions.scss';
const Transactions = () => {
  // transaction card
  return (
    <div className='transactions'>
      <div className='transactions__card'>
        <div className='transactions__card__header'>
          <h3>Transactions</h3>
        </div>
        <div className='transactions__card__body'>
          <div className='transactions__card__body__item'></div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
