const Balance = ({ value }) => {
  return (
    <>
      <div className="flex gap-2 pt-4">
        <div>Your balance</div>
        <div>{value}</div>
      </div>
    </>
  );
};

export default Balance;
