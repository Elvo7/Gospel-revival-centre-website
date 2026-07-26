function Button({ children }) {
  return (
    <button className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-red-600 hover:scale-105">
      {children}
    </button>
  );
}

export default Button;