import useStore from '../useStore.js';
import Button from '../components/Button.js';

export default function UserStatusPage({
  onLogin,
  user,
  isUsernameTaken,
  token,
}) {
  const loans = useStore(state => state.loans);
  const setAvailableLoans = useStore(state => state.setAvailableLoans);

  return (
    <main>
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
          {loans &&
            loans.map(loan => (
              <dl>
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

  async function getAvailableLoans() {
    try {
      const response = await fetch(
        'https://api.spacetraders.io/my/account?token=' + token
      );
      const data = await response.json();
      setAvailableLoans(data.loans);
    } catch (error) {
      console.error('ERROR:', error);
    }
  }
}
