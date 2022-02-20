import useStore from '../useStore.js';
import Button from '../components/Button.js';

export default function UserStatusPage({ onLogin, user, isUsernameTaken }) {
  const availableLoans = useStore(state => state.availableLoans);
  const token = useStore(state => state.token);
  // const loansLoading = useStore(state => state.loansLoading);
  const getAvailableLoans = useStore(state => state.getAvailableLoans);
  const takeOutLoan = useStore(state => state.takeOutLoan);

  return (
    <main>
      <h2>User status</h2>
      {user.data ? (
        <>
          <dl>
            <dt>Credits:</dt>
            <dd>{user.data.credits}</dd>
            <dt>Ships:</dt>
            <dd>{user.data.shipCount}</dd>
          </dl>
          <Button handleClick={getAvailableLoans}>Show available loans</Button>
          {availableLoans.error && (
            <p>Currently there are no loans available. You are too broke!</p>
          )}
          {availableLoans.data !== null
            ? availableLoans.data.map(loan => (
                <>
                  <dl key={loan.id}>
                    <dt>Amount:</dt>
                    <dd>{loan.amount}</dd>
                    <dt>Rate:</dt>
                    <dd>{loan.rate}%</dd>
                    <dt>Due date:</dt>
                    <dd>{loan.termInDays}</dd>
                    <dt>Type:</dt>
                    <dd>{loan.type}</dd>
                  </dl>
                  <Button
                    handleClick={takeOutLoan}
                    disabled={user.data.loans.length > 0 ? true : false}
                  >
                    Take out a loan
                  </Button>
                </>
              ))
            : ''}
          {user.data.loans !== null
            ? user.data.loans.map(loan => (
                <dl key={loan.id}>
                  <dt>Due date:</dt>
                  <dd>{loan.due}</dd>
                  <dt>Status:</dt>
                  <dd>{loan.status}</dd>
                  <dt>Repayment amount:</dt>
                  <dd>{loan.repaymentAmount}</dd>
                  <dt>Type:</dt>
                  <dd>{loan.type}</dd>
                </dl>
              ))
            : ''}
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
          {isUsernameTaken && <p>Username is already taken! Get creative!</p>}
          {token.error && <p>Server is currently not working. Get a life!.</p>}
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
