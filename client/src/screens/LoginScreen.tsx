import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/userAction';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { Link } from 'react-router-dom';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      window.location.href = "/"
    }
  }, []);

  const loginState = useSelector((state: any) => state.loginUserReducer);
  const { error, loading } = loginState;

  const dispatch = useDispatch<any>();

  const login = () => {
    const user = {
      email,
      password
    }

    dispatch(loginUser(user));
  }

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 shadow-lg p-3 mb-5 bg-white rounded" style={{ textAlign: 'left' }}>
          <h2 className='m-2' style={{ fontSize: '35px', textAlign: 'center' }}>Login</h2>

          {loading && <Loading />}
          {error && <Error error='Invalid Credentials' />}

          <div>
            <input
              type='email'
              placeholder='email'
              className='form-control'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='password'
              className='form-control'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className='btn mt-3 mb-3'
              onClick={login}
            >
              LOGIN
            </button>
            <br />
            <Link style={{ color: 'black' }}
              to='/register'>Click here to register</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
