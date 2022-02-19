export default function Button({ handleClick, children, disabled }) {
  return (
    <button onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
}
