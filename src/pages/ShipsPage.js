import Button from '../components/Button';
import useStore from '../useStore';

export default function ShipsPage() {
  const shipList = useStore(state => state.shipList);
  const getShipList = useStore(state => state.getShipList);
  const getShip = useStore(state => state.getShip);
  const user = useStore(state => state.user);

  return (
    <main>
      <h2>Available Ships</h2>
      {user.data && user.data.ships !== null
        ? user.data.ships.map(ship => (
            <dl key={ship.id}>
              <dt>Manufacturer:</dt>
              <dd>{ship.manufacturer}</dd>
              <dt>Max Cargo:</dt>
              <dd>{ship.maxCargo}</dd>
              <dt>Current Cargo:</dt>
              <dd>
                {ship.cargo.length < 1 && `you don't have anything loeaded`}
              </dd>
              <dt>Type:</dt>
              <dd>{ship.type}</dd>
              <dt>Available space:</dt>
              <dd>{ship.spaceAvailable}</dd>
            </dl>
          ))
        : ''}
      <Button handleClick={getShipList}>Show available ships</Button>
      {shipList.error && (
        <p>Currently there are no ships available. You are too broke!</p>
      )}
      {shipList.data !== null
        ? shipList.data.map(ship => (
            <>
              <dl key={ship.id}>
                <dt>Class:</dt>
                <dd>{ship.class}</dd>
                <dt>Manufacturer:</dt>
                <dd>{ship.manufacturer}</dd>
                <dt>MaxCargo:</dt>
                <dd>{ship.maxCargo}</dd>
                <dt>Speed:</dt>
                <dd>{ship.speed}</dd>
                <dt>Type:</dt>
                <dd>{ship.type}</dd>
                <dt>Weapons:</dt>
                <dd>{ship.weapons}</dd>
              </dl>
              <Button
                handleClick={() =>
                  getShip(ship.purchaseLocations[0].location, ship.type)
                }
              >
                Buy a ship
              </Button>
            </>
          ))
        : ''}
    </main>
  );
}
