import   { useState } from 'react';
import { useDispatch  } from 'react-redux';
import {   register } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
  
const Register = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleRegister = () => {
      if (!name || !email || !password || password !== confirmPassword) {
        setError('Please fill in all fields and make sure passwords match');
        return;
      }
  
      dispatch(register({ name, email, password, password_confirmation: confirmPassword }) as any)
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
        <h2>Register</h2>
        {error && <p>{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control mb-3"
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="form-control mb-3"
        />
        <button onClick={handleRegister} className="btn btn-primary">
          Register
        </button>
      </div>
    );
  };
  
  export default Register ;