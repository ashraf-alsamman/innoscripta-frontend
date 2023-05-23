import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = () => {
      if (!email || !password) {
        setError('Please enter both email and password');
        return;
      }
  
      dispatch(login({ email, password }) as any)
        .unwrap()
        .then((data) => {
          navigate('/');
        })
        .catch((err: any) => {
          setError(err.message);
        });
    };
  
  
  
  
  
    return (
      <div>
  
  
        <h2>Login</h2>
        {error && <p>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-3"
        />
        <button onClick={handleLogin} className="btn btn-primary">
          Login
        </button>
  
      </div>
    );
  };

  export default Login ;