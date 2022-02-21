import styled from 'styled-components';
import Button from './Button.js';
import useStore from '../useStore.js';

export default function LoginPage({ token }) {
  const loginUser = useStore(state => state.loginUser);
  const isUsernameTaken = useStore(state => state.isUserNameTaken);

  return (
    <Wrapper>
      <h2>START YOUR JOURNEY TO OUTER SPACE</h2>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="username">... by selecting a username:</label>
        <Input
          required
          id="username"
          name="username"
          type="text"
          placeholder="e.g. neuefische"
        />

        {isUsernameTaken && (
          <ErrorMessage>Username is already taken! Get creative!</ErrorMessage>
        )}
        {token && (
          <ErrorMessage>
            Server is currently not working. Get a life!.
          </ErrorMessage>
        )}
        <Button>LOGIN</Button>
      </Form>
    </Wrapper>
  );

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const input = form.elements.username;
    loginUser(input.value);
  }
}

const Wrapper = styled.div`
  display: grid;
  gap: 50px;

  & h2 {
    text-align: center;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 5px;
`;

const Input = styled.input`
  padding: 6px;
`;

const ErrorMessage = styled.p`
  padding-top: 5px;
  color: red;
`;
