const Button = ({ bName, onClick }) => {
  return (
    <>
      <div className="border border-black rounded bg-blue-500 text-white py-1 mt-3">
        <button onClick={onClick}>{bName}</button>
      </div>
    </>
  );
};

export default Button;
