const SummaryCard = ({ label, amount, type = "positive" }) => {
  return (
    <div className="glass p-5 rounded-xl border border-white/10">
      <p className="text-sm text-gray-400">{label}</p>
      <h2
        className={`text-2xl font-bold mt-2 ${
          type === "positive"
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        ₹ {amount.toLocaleString()}
      </h2>
    </div>
  );
};

export default SummaryCard;
