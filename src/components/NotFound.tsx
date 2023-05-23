import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  const [counter, setCounter] = useState(5); // Initial counter value

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    // Redirect to the home page when counter reaches 0
    if (counter === 0) {
      // Replace '/home' with the appropriate home page route
      window.location.href = '/';
    }

    return () => clearTimeout(timer);
  }, [counter]);

  const styles: { [key: string]: React.CSSProperties } = {
    notFound: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f1f1f1',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
    },
    heading: {
      fontSize: '48px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    message: {
      fontSize: '24px',
      textAlign: 'center',
    },
    link: {
      fontSize: '16px',
      textDecoration: 'underline',
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.notFound}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.message}>
        Page Not Found. Redirecting to the homepage in {counter} seconds...
      </p>
      <Link to="/" style={styles.link}>
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
