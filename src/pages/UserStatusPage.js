import useStore from '../useStore.js';
import styled from 'styled-components';
import Button from '../components/Button.js';
import LoginPage from '../components/LoginPage.js';

export default function UserStatusPage({ user, token }) {
  const availableLoans = useStore(state => state.availableLoans);
  const getAvailableLoans = useStore(state => state.getAvailableLoans);
  const takeOutLoan = useStore(state => state.takeOutLoan);

  return (
    <main>
      {user.data ? (
        <PageGrid>
          <section>
            <Heading>Dashboard</Heading>
            <UserInfo>
              <p>Credits: {user.data.credits}</p>
              <p>Ships: {user.data.ships.length}</p>
            </UserInfo>
          </section>
          <Wrapper>
            <Heading>Your Loans</Heading>
            {user.data.loans.length !== 0 ? (
              user.data.loans.map(loan => (
                <LoanContainer key={loan.id}>
                  <Header>
                    <span>{loan.type}</span>
                    <span>{loan.status}</span>
                  </Header>
                  <p>
                    {loan.repaymentAmount} Credits due {loan.due}
                  </p>
                </LoanContainer>
              ))
            ) : (
              <p>You are completley broke. Get a loan!</p>
            )}
          </Wrapper>
          <Wrapper>
            <Heading>Available Loans</Heading>
            {availableLoans.error && (
              <p>Currently there are no loans available. You are too broke!</p>
            )}
            {availableLoans.data !== null ? (
              availableLoans.data.map(loan => (
                <LoanContainer key={loan.id}>
                  <Header>
                    <span>{loan.type}</span>
                    <span>{loan.termInDays} days</span>
                  </Header>
                  <p>
                    {loan.amount} Credits at {loan.rate}%
                  </p>
                  <Button
                    handleClick={takeOutLoan}
                    disabled={user.data.loans.length > 0 ? true : false}
                  >
                    ACCEPT LOAN
                  </Button>
                </LoanContainer>
              ))
            ) : (
              <Button handleClick={getAvailableLoans}>
                SHOW AVAILABLE LOANS
              </Button>
            )}{' '}
          </Wrapper>
        </PageGrid>
      ) : (
        <LoginPage token={token} />
      )}
    </main>
  );
}

const PageGrid = styled.div`
  display: grid;
  gap: 20px;
`;

const Wrapper = styled.section`
  display: grid;
  gap: 5px;

  & p {
    padding: 10px 0 0 12px;
  }
`;

const Heading = styled.h2`
  font-size: 1.4rem;
  font-weight: 500;
  padding: 5px 10px;
`;

const UserInfo = styled.div`
  padding: 10px 15px;
  background-color: #1c1c1c;
  border-radius: 6px;
`;

const LoanContainer = styled.div`
  display: grid;
  gap: 5px;
  padding: 10px 15px;
  background-color: #1c1c1c;
  border-radius: 6px;
  font-size: 1.1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #9ba5b0;
  padding-bottom: 10px;
`;
