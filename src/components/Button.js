import styled from 'styled-components';

export default function Button({ handleClick, children, disabled, hidden }) {
  return (
    <StyledButton onClick={handleClick} disabled={disabled} hidden={hidden}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  padding: 8px 12px;
  margin: 10px 0;
  background-color: ${props => (props.disabled ? '#65737e' : '#46b791')};
  color: #333;
  font-weight: 500;
  border: none;
  border-radius: 4px;
`;
