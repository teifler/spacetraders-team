import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation.js';
import ShipsPage from './pages/ShipsPage.js';
import UserStatusPage from './pages/UserStatusPage.js';
import MarketPage from './pages/MarketPage.js';
import { useEffect, useState } from 'react';

function App() {
  const [token, setToken] = useState(loadFromLocal('token'));
  const [user, setUser] = useState(null);
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);

  useEffect(() => {
    saveToLocal('token', token);

    if (token && !user) {
      getUserInfo(token);
    }
  }, [user, token]);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <UserStatusPage
              onLogin={loginUser}
              user={user}
              isUsernameTaken={isUsernameTaken}
            />
          }
        />
        <Route path="/ships" element={<ShipsPage />} />
        <Route path="/market" element={<MarketPage />} />
      </Routes>
    </div>
  );

  async function loginUser(username) {
    setIsUsernameTaken(false);

    const response = await fetch(
      `https://api.spacetraders.io/users/${username}/claim`,
      {
        method: 'POST',
      }
    ).catch(error => {
      console.log('ERROR', error.message);
    });

    if (response.ok) {
      const data = await response.json();
      setToken(data.token);
      setUser(data.user);
    } else {
      setIsUsernameTaken(true);
    }
  }

  async function getUserInfo(token) {
    try {
      const response = await fetch(
        'https://api.spacetraders.io/my/account?token=' + token
      );
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error('ERROR:', error);
    }
  }

  function saveToLocal(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function loadFromLocal(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      console.log(error);
    }
  }
}

export default App;
