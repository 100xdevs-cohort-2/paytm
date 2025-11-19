export const Balance = ({ value }) => {
  const formattedValue = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value || 0);

  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-xl shadow-md">
      <div className="text-lg font-semibold">Your Balance</div>
      <div className="text-2xl font-bold">₹ {formattedValue}</div>
    </div>
  );
};
