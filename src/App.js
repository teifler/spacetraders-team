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
  const getUserInfo = useStore(state => state.getUserInfo);
  const token = useStore(state => state.token);

  useEffect(() => {
    if (token && !user) {
      getUserInfo(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token]);

  return (
    <AppGrid>
      <Header user={user} userError={user.error} />
      <Routes>
        <Route
          path="/"
          element={<UserStatusPage user={user} token={token.error} />}
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
