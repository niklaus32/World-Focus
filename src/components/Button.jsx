function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition cursor-pointer"
    >
      {children}
    </button>
  );
}

export default Button;
