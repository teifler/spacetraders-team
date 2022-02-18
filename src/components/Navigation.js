import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav>
      <LinkButton to="/">User status</LinkButton>
      <LinkButton to="/ships">Available ships</LinkButton>
      <LinkButton to="/market">Marketplace</LinkButton>
    </nav>
  );
}

const LinkButton = styled(NavLink)`
  padding: 4px 12px;
  border: 1px solid #bbb;
  border-radius: 4px;
  background-color: #eee;
  text-decoration: none;
  color: #333;
  &.active {
    background-color: hotpink;
  }
`;
