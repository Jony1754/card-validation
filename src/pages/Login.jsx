import React from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import calvito from '../assets/calvito.jpg';
import noman from '../assets/noman.png';
import '../scss/login.scss';
export const Login = ({ setIsLogged }) => {
  const [validUser, setValidUser] = React.useState('');
  const [passcode, setPasscode] = React.useState('');
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    setPasscode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('validUser', validUser, 'pass', passcode);

    setTimeout(() => {
      if (validUser === 'ariasej' && passcode === '1234') {
        console.log('validUser', validUser, 'pass', passcode);
        setError(false);
        setIsLogged(true);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    }, 4000);
  };

  return validUser.length > 0 ? (
    <div className='login__container transition'>
      <div className='login'>
        <img src={calvito} alt='avatar' />

        <h3>Welcome back</h3>
        <h2>Jonathan Arias</h2>
        <form action='' className='login-form' onSubmit={handleSubmit}>
          <input
            type='password'
            placeholder='Enter your passcode'
            name='passcode'
            onChange={handleChange}
          />
          {loading ? (
            <CircularProgress />
          ) : (
            <button type='submit'>Login</button>
          )}
          <Link to='#'>Forgot your passcode?</Link>
        </form>
      </div>
    </div>
  ) : (
    <LoginWithoutUser
      setLoading={setLoading}
      loading={loading}
      setError={setError}
      setValidUser={setValidUser}
    />
  );
};

const LoginWithoutUser = ({ setLoading, setError, setValidUser, loading }) => {
  const [user, setUser] = React.useState('');
  const handleChange = (e) => {
    setUser(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === 'ariasej') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setValidUser(user);
      }, 3000);
    } else {
      setError(true);
    }
  };
  return (
    <div className='login transition'>
      <img src={noman} alt='avatar' />
      <h3>Please type your username</h3>
      <h2>Welcome!</h2>
      <form className='login-form' onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name='username'
          type='text'
          placeholder='Enter your username'
          value={user}
        />
        {loading ? <CircularProgress /> : <button type='submit'>BEGIN</button>}
        {/* <button type='submit'>BEGIN</button> */}
        <Link to='#'>Forgot your login info?</Link>
      </form>
    </div>
  );
};
