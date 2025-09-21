function Button({ children, onClick, type = "button", pressed = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-600 text-white px-3 py-1 rounded transition-all duration-150 shadow-md cursor-pointer
        hover:opacity-80 active:scale-95
        ${pressed ? "opacity-60" : "opacity-100"}`}
    >
      {children}
    </button>
  );
}

export default Button;