import React from 'react';
import { Link } from 'react-router-dom';
import { selectAuth } from '../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { clearToken } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const AuthNav = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  async function logout() {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      try {
        await dispatch(clearToken()); // Wait for the clearToken action to complete
        // navigate('/');
      } catch (err) {
        // setError(err.message);
      }
    }
  }
  if (auth) {
    const isAuthenticated = JSON.parse(auth.isAuthenticated);

    if (isAuthenticated) {
      return (
        <>
          <li className="nav-item">
            <Link to="/articles/my" className="nav-link">My Articles</Link>
          </li>
          <li className="nav-item">
            <Link to="/preferences" className="nav-link">Preferences</Link>
          </li>
          <li className="nav-item ms-auto">
            <button type="button" className="btn btn-outline-secondary" onClick={logout}>logout</button>
          </li>

        </>
      );
    } else {
      return (
        <li className="nav-item ms-auto">
          <Link to="/auth" className="nav-link active">login & signup</Link>
        </li>
      );
    }
  } else {
    return null; // or any other fallback UI you prefer
  }
};





const Header: React.FC = () => {


  return (
    <>
 

      <nav className="navbar navbar-expand-lg my-navbar-dark  mb-5">
      <div className="container">
        <Link to="/" className="navbar-brand">innoscripta</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav w-100">
            <li className="nav-item">
              <Link to="/articles" className="nav-link " aria-current="page">Latest Articles</Link>
            </li>
            <AuthNav />
          </ul>
        </div>
      </div>
    </nav>
    </>

  );
};

export default Header;










