import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/authSlice';
import Register from "../components/Register";
import Login from "../components/Login";
import Loading from "../components/Loading";

export default function Auth() {
  const auth = useSelector(selectAuth);
  return (
    <div className="container">
 
      {auth && auth['loading'] ? (
        <Loading />
      ) : (
        <>
          <h2 className="text-left mb-4">Welcome to Our Platform</h2>
          <p className="text-left">
            To personalize your experience and stay updated with the latest news based on your preferences, please log in or register a new account.
          </p>
          <div className="row justify-content-center mb-5">
            <hr />
            <br />

            <div className="col-md-6 col-sm-12 col-xs-12">
              <Login />
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12 mt-4 mt-md-0">
              <Register />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
