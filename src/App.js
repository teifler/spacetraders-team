import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation.js';
import ShipsPage from './pages/ShipsPage.js';
import UserStatusPage from './pages/UserStatusPage.js';
import MarketPage from './pages/MarketPage.js';
import { useEffect, useState } from 'react';
import useStore from './useStore.js';

function App() {
  const user = useStore(state => state.user);
  const setUser = useStore(state => state.setUser);
  const token = useStore(state => state.token);
  const setToken = useStore(state => state.setToken);
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);

  useEffect(() => {
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
              token={token}
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
      console.log('Test -- ', data);
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
}

export default App;
