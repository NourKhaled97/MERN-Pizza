import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/userAction';
import Loading from '../components/Loading';
import Success from '../components/Success';
import Error from '../components/Error';
import { Link } from 'react-router-dom';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');

  const registerState = useSelector((state: any) => state.registerUserReducer);
  const { error, loading, success } = registerState;

  const dispatch = useDispatch<any>();

  const register = () => {
    if (password !== cpassword) {
      alert("Passwords not matched");
    }
    else {
      const user = {
        name,
        email,
        password
      }

      dispatch(registerUser(user));
    }
  }

  return (
    <div className='register'>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 shadow-lg p-3 mb-5 bg-white rounded" style={{ textAlign: 'left' }}>

          {loading && <Loading />}
          {success && <Success message='User register successfully' />}
          {error && <Error error='User register failed' />}

          <h2 className='m-2' style={{ fontSize: '35px', textAlign: 'center' }}>Register</h2>
          <div>
            <input
              type='text'
              placeholder='name'
              className='form-control'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <input
              type='password'
              placeholder='confirm password'
              className='form-control'
              required
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
            <button
              className='btn mt-3 mb-3'
              onClick={register}
            >
              REGISTER
            </button>
            <br />
            <Link style={{ color: 'black' }}
              to='/login'>Click here to login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
