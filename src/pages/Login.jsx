import React from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import calvito from '../assets/calvito.jpg';
import noman from '../assets/noman.png';
import axios from 'axios';
import '../scss/login.scss';
import { useLocalStorage } from '../hooks/useLocalStorage';
export const Login = ({ setIsLogged }) => {
  const [validUser, setValidUser] = React.useState('');
  const [passcode, setPasscode] = React.useState('');
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState('Jonathan Arias');
  const [loginData, setLoginData] = React.useState();
  React.useEffect(() => {
    setLoading(false);
  }, []);
  const handleChange = (e) => {
    setPasscode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('validUser', validUser, 'pass', passcode);

    axios
      .post('http://localhost:3005/Login/Login', {
        user: validUser,
        pasw: passcode,
      })
      .then((res) => {
        console.log('res', res.data);
        setLoginData(res.data);
        setIsLogged(true);
        if (res.data.status === 'success') {
          setIsLogged(true);
        } else {
          setError(true);
        }
        setLoading(false);
      });

    // setTimeout(() => {
    //   if (validUser === 'ariasej' && passcode === '1234') {
    //     console.log('validUser', validUser, 'pass', passcode);
    //     setError(false);
    //     setIsLogged(true);
    //     setLoading(false);
    //   } else {
    //     setError(true);
    //     setLoading(false);
    //   }
    // }, 4000);
  };

  return validUser.length > 0 ? (
    <div className='login__container transition'>
      <div className='login'>
        <img src={calvito} alt='avatar' />
        <h3>Welcome back</h3>
        <h2>{name ? name[0].toUpperCase() + name.substring(1) : ''}</h2>
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
      setName={setName}
    />
  );
};

const LoginWithoutUser = ({
  setLoading,
  setError,
  setValidUser,
  loading,
  setName,
}) => {
  React.useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const [numCuenta, setNumCuenta] = useLocalStorage('Num_cuenta', '1010');
  const [user, setUser] = React.useState('');
  const handleChange = (e) => {
    setUser(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setLoading(true);
    axios
      .post('http://localhost:3005/Info/InfoP', { user: user })
      .then((res) => {
        console.log('res.data[0] en login', res.data[0]);
        setName(res.data[0].Nombre);

        setLoading(false);
        setValidUser(user);
        console.log('NUM CUENTA,', res.data[0].Num_cuenta);
        setNumCuenta(res.data[0].Num_cuenta);
      });
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
