import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';
import useStore from './useStore.js';
import Header from './components/Header.js';
import Navigation from './components/Navigation.js';
import ShipsPage from './pages/ShipsPage.js';
import UserStatusPage from './pages/UserStatusPage.js';
import MarketPage from './pages/MarketPage.js';

function App() {
  const user = useStore(state => state.user);
  const userError = useStore(state => state.userError);
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
    <AppGrid>
      <Header user={user} userError={userError} />
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
      <Navigation />
    </AppGrid>
  );
}

export default App;

const AppGrid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr 48px;
`;
