import styled from 'styled-components';
import Button from '../components/Button';
import useStore from '../useStore';

export default function ShipsPage() {
  const shipList = useStore(state => state.shipList);
  const getShipList = useStore(state => state.getShipList);
  const getShip = useStore(state => state.getShip);
  const user = useStore(state => state.user);

  return (
    <Scrollarea>
      <Wrapper>
        <Heading>Your Ships</Heading>
        {user.data && user.data.ships.length > 0 ? (
          user.data.ships.map(ship => (
            <ShipContainer key={ship.id}>
              <ShipHeader>
                <span>{ship.manufacturer}</span>
                <span>{ship.class}</span>
              </ShipHeader>
              <ShipDetails>
                <span>Type: {ship.type}</span>
                <span>Location: {ship.location}</span>
                <span>Speed: {ship.speed}</span>
                <span>Available Space: {ship.spaceAvailable}</span>
                <span>Plating: {ship.plating}</span>
                <span>Current Cargo: {ship.cargo.length < 1 && '0'}</span>
                <span>Weapons: {ship.weapons}</span>
                <span>Maximum Cargo: {ship.maxCargo}</span>
              </ShipDetails>
            </ShipContainer>
          ))
        ) : (
          <p>You currently have no ships. Go and get some!</p>
        )}
        {shipList.error && (
          <p>Currently there are no ships available. You are too broke!</p>
        )}
      </Wrapper>
      <Wrapper>
        <Heading>Available Ships</Heading>
        {shipList.data !== null ? (
          shipList.data.map(ship => (
            <ShipContainer key={ship.id}>
              <ShipHeader>
                <span>{ship.manufacturer}</span>
                <span>{ship.class}</span>
              </ShipHeader>
              <ShipDetails>
                <span>Type: {ship.type}</span>
                <span>Speed: {ship.speed}</span>
                <span>Maximum Cargo: {ship.maxCargo}</span>
                <span>Weapons: {ship.weapons}</span>
              </ShipDetails>
              <Button
                handleClick={() =>
                  getShip(ship.purchaseLocations[0].location, ship.type)
                }
              >
                PURCHASE
              </Button>
            </ShipContainer>
          ))
        ) : (
          <Button handleClick={getShipList}>Show available ships</Button>
        )}
      </Wrapper>
    </Scrollarea>
  );
}

const Scrollarea = styled.main`
  overflow-y: scroll;
`;

const Wrapper = styled.section`
  display: grid;
  gap: 10px;
  padding: 10px 0;

  & p {
    padding: 10px 0 0 12px;
  }
`;

const Heading = styled.h2`
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0 10px;
`;

const ShipContainer = styled.div`
  display: grid;
  gap: 5px;
  padding: 10px 15px;
  background-color: #1c1c1c;
  border-radius: 6px;
  font-size: 1.1rem;
`;

const ShipHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 600;
  color: #9ba5b0;
  padding-bottom: 10px;
`;

const ShipDetails = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  padding: 0 0 0 5px;
  font-weight: 300;
  font-size: 1rem;
`;
