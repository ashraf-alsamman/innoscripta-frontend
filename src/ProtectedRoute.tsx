import { Navigate } from 'react-router-dom';
import { selectAuth } from './redux/authSlice';
import { useSelector } from 'react-redux';

export type ProtectedRouteProps = {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const auth = useSelector(selectAuth);

  if (auth) {
    const isAuthenticated = JSON.parse(auth.isAuthenticated);;
    if (isAuthenticated) {
      return <>{children}</>;
    } else {
      return <Navigate to={{ pathname: '/auth' }} />;
    }
  } else {
    return <Navigate to={{ pathname: '/auth' }} />;
  }
}
