import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <Wrapper>
      <LinkButton to="/">User</LinkButton>
      <LinkButton to="/ships">Ships</LinkButton>
      <LinkButton to="/market">Market</LinkButton>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: grid;
  gap: 3px;
  grid-template-columns: repeat(3, 1fr);
`;

const LinkButton = styled(NavLink)`
  padding: 15px 15px;
  font-weight: 600;
  background-color: #65737e;
  text-decoration: none;
  text-align: center;
  color: #333;
  &.active {
    background-color: #c0c5ce;
  }
`;
