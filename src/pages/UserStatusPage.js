export default function UserStatusPage({ onLogin, user, isUsernameTaken }) {
  return (
    <main>
      <h1>User status</h1>
      {user ? (
        <dl>
          <dt>Username:</dt>
          <dd>{user.username}</dd>
          <dt>Credits:</dt>
          <dd>{user.credits}</dd>
        </dl>
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
