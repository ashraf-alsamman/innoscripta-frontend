import MyArticles from './pages/MyArticles';
import Articles from './pages/Articles';
import Auth from './pages/Auth';
import Preferences from './pages/Preferences';
import NotFound from './components/NotFound';
import Header from './components/Header';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import './styles.css';




function App() {

  return (

    <>

      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/preferences" element={<ProtectedRoute  > <Preferences /> </ProtectedRoute>} />
            <Route path="/articles/my" element={<ProtectedRoute  > <MyArticles /> </ProtectedRoute>} />

            <Route path="/articles" element={<Articles />} />
            <Route path="/Auth" element={<Auth />} />
            <Route path="/" element={<Articles />} />

            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
