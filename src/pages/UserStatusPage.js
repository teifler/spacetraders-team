import useStore from '../useStore.js';
import Button from '../components/Button.js';
import { useEffect } from 'react';

export default function UserStatusPage({
  onLogin,
  user,
  isUsernameTaken,
  token,
}) {
  const loans = useStore(state => state.loans);
  const loansError = useStore(state => state.loansError);
  const loansLoading = useStore(state => state.loansLoading);
  const getAvailableLoans = useStore(state => state.getAvailableLoans);
  useEffect(() => {
    console.log('loans', loans);
  }, [loans]);
  return (
    <main>
      {loansError && <p>{loansError.message}</p>}
      {loansLoading && <p>loading...</p>}
      <h1>User status</h1>
      {user ? (
        <>
          <dl>
            <dt>Username:</dt>
            <dd>{user.username}</dd>
            <dt>Credits:</dt>
            <dd>{user.credits}</dd>
          </dl>
          <Button handleClick={getAvailableLoans}>Show available loans</Button>
          {loans.map((loan, index) => (
            <dl key={loan.id}>
              <dt>Amount:</dt>
              <dd>{loan.amount}</dd>
              <dt>Type:</dt>
              <dd>{loan.type}</dd>
            </dl>
          ))}
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Please select a user name</label>
          <input
            required
            id="username"
            name="username"
            type="text"
            placeholder="e.g. neuefische"
          />
          {isUsernameTaken && <p>Username already taken!</p>}
          <button>Login</button>
        </form>
      )}
    </main>
  );

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const input = form.elements.username;
    onLogin(input.value);
  }
}
