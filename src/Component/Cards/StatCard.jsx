const StatCard = ({ title, value, icon, color = "green", subText }) => {
  return (
    <div className="glass p-5 rounded-xl border border-white/10 hover:scale-[1.02] transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h2 className="text-2xl font-bold mt-1">{value}</h2>
          {subText && (
            <p className="text-xs text-gray-400 mt-1">{subText}</p>
          )}
        </div>

        <div
          className={`w-12 h-12 flex items-center justify-center rounded-xl bg-${color}-500/20 text-${color}-400 text-xl`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
