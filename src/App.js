import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';
import useStore from './useStore.js';
import Navigation from './components/Navigation.js';
import ShipsPage from './pages/ShipsPage.js';
import UserStatusPage from './pages/UserStatusPage.js';
import MarketPage from './pages/MarketPage.js';

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
    <AppGrid>
      <Header>
        <h1>Spacetraders</h1>
        <User>User: </User>
        <Credit>Credits: </Credit>
      </Header>
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

const Header = styled.header`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  background-color: lightgrey;

  background-color: #65737e;
  & h1 {
    justify-self: center;
    align-self: center;
    grid-area: 1 / 1 / 2 / 4;
    font-size: 1.8rem;
    font-family: 'spaceAge', 'sans-serif';
  }
`;

const User = styled.p`
  grid-area: 2 / 2 / 3 /3;

  align-self: end;
`;

const Credit = styled.p`
  grid-area: 2 / 3 / 3 / 4;
  align-self: end;
`;
