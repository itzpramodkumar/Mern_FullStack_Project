const ChartCard = ({ title, children }) => {
  return (
    <div className="glass p-6 rounded-xl border border-white/10">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
};

export default ChartCard;
