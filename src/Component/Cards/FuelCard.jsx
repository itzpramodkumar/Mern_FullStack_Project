const FuelCard = ({ fuel, stock, capacity, unit, color }) => {
  const percentage = Math.round((stock / capacity) * 100);
  const lowStock = percentage < 25;

  return (
    <div className="glass p-5 rounded-xl border border-white/10">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">{fuel}</h3>
        {lowStock && (
          <span className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-400">
            Low
          </span>
        )}
      </div>

      <p className="text-2xl font-bold">
        {stock} <span className="text-sm">{unit}</span>
      </p>

      <div className="mt-3">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full bg-${color}-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          {percentage}% of capacity
        </p>
      </div>
    </div>
  );
};

export default FuelCard;
