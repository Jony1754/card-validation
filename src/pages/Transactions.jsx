import React, { useState } from 'react';
import '../scss/transactions.scss';
import axios from 'axios';
import { useTransactions } from '../hooks/useTransactions';
import { useLocalStorage } from '../hooks/useLocalStorage';
const Transactions = () => {
  // transaction card
  const { transactions, loading } = useTransactions();
  const [Num_cuenta, setNum_cuenta] = useLocalStorage('Num_cuenta', '');
  const [historial, setHistorial] = useState([]);
  const [Num_cuenta2, setNum_cuenta2] = useState('');
  const [ac, setAc] = useState('');
  const [cant, setCant] = useState('');
  const [conp, setConp] = useState('');
  const [tarj, setTarj] = useState('');
  const [csv, setCSV] = useState('');
  const [saldo, setSaldo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3005/Transacciones/Transaccion', {
        Num_cuenta,
        ac,
        cant,
        conp,
        tarj,
        csv,
      })
      .then((res) => {
        console.log('RESPUESTA AL ENVIAR TRANSACCION', res.data);
      });
  };
  React.useEffect(() => {
    // console.log(transactions);
    axios
      .post('http://localhost:3005/Info/Historial', { Num_cuenta })
      .then((res) => {
        console.log('CONSULTA DEL HISTORIAL', res.data);
        setHistorial(res.data);
      });

    axios
      .post('http://localhost:3005/Info/Saldo', {
        act: 1,
        Num_cuenta: Num_cuenta,
      })
      .then((res) => {
        console.log('RESPUESTA DE SALDO', res.data);
        setSaldo(res.data[0].Cantidad);
      });
  }, []);

  return (
    <div className='transactions'>
      <div className='balance'>
        <h1 className='balance__title'>Balance</h1>
        <h2 className='balance__value'>${saldo}</h2>
      </div>
      <div className='transactions__card'>
        {historial.map((transaction) => {
          return (
            <div className='transactions__card__item '>
              {/* <div className='delete_button'>x</div> */}
              <div className='transactions__card__item__date'>
                <h4>Date</h4>
                <p>{transaction.Acdate}</p>
              </div>
              <div className='transactions__card__item__description'>
                <h4>Recipient: </h4>
                <p>{transaction.Id_cuenta_recibido}</p>
              </div>
              <div className='transactions__card__item__amount'>
                <p>AMOUNT</p>

                <h4> {transaction.Cantidad}</h4>
              </div>
            </div>
          );
        })}
      </div>
      <div className='create_transaction_form'>
        <form action='' onSubmit={handleSubmit}>
          <div className='create_transaction_form__item'>
            <label htmlFor='recipient'>Recipien (account number)</label>
            <input
              type='text'
              name='recipient'
              id='recipient'
              onChange={(e) => {
                setAc(e.target.value);
              }}
            />
          </div>
          <div className='create_transaction_form__item'>
            <label htmlFor='amount'>Amount</label>
            <input
              type='text'
              name='amount'
              id='amount'
              onChange={(e) => {
                setCant(e.target.value);
              }}
            />
          </div>
          <div className='create_transaction_form__item'>
            <label htmlFor='description'>Description</label>
            <input
              type='text'
              name='description'
              id='description'
              onChange={(e) => {
                setConp(e.target.value);
              }}
            />
          </div>
          <div className='create_transaction_form__item'>
            <label htmlFor='cardnumber'>Card number</label>
            <input
              type='text'
              name='cardnumber'
              id='cardnumber'
              onChange={(e) => {
                setTarj(e.target.value);
              }}
            />
          </div>
          <div className='create_transaction_form__item'>
            <label htmlFor='text'>CCV</label>
            <input
              type='number'
              name='ccv'
              id='ccv'
              onChange={(e) => {
                setCSV(e.target.value);
              }}
            />
          </div>

          <button
            type='submit'
            className='create_transaction_form__item--submit'
          >
            Create Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default Transactions;
