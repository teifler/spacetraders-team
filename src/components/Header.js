import styled from 'styled-components';

export default function Header({ user }) {
  return (
    <Wrapper>
      <h1>Spacetraders</h1>
      {user.error ? (
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
