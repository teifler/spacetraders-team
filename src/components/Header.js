import styled from 'styled-components';

export default function Header({ user, error }) {
  return (
    <Wrapper>
      <h1>Spacetraders</h1>
      {error ? (
        <p>Server currently not available!</p>
      ) : user.data ? (
        <>
          <User>{user.data.username} </User>
          <Credit>{user.data.credits} Credits </Credit>
        </>
      ) : (
        ''
      )}
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: grid;
  grid-template-columns: 1fr auto auto;
  grid-template-rows: repeat(2, 1fr);
  background-color: #65737e;
  font-weight: 600;
  padding-bottom: 5px;

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
  justify-self: end;
  padding-right: 10px;
  border-right: 2px solid #f3f8ff;
  color: #121212;
`;

const Credit = styled.p`
  grid-area: 2 / 3 / 3 / 4;
  align-self: end;
  padding: 0 15px 0 10px;
  color: #121212;
`;
