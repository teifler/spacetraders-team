import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation.js';
import ShipsPage from './pages/ShipsPage.js';
import UserStatusPage from './pages/UserStatusPage.js';
import MarketPage from './pages/MarketPage.js';
import { useEffect } from 'react';
import useStore from './useStore.js';

function App() {
  const user = useStore(state => state.user);
  const loginUser = useStore(state => state.loginUser);
  const getUserInfo = useStore(state => state.getUserInfo);
  const token = useStore(state => state.token);
  const isUsernameTaken = useStore(state => state.isUserNameTaken);

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
}

export default App;
