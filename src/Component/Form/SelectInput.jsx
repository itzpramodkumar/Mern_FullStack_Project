const SelectInput = ({
  label,
  value,
  onChange,
  options = [],
  required = false,
}) => {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-400">
        {label} {required && "*"}
      </label>

      <select
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-green-500"
      >
        <option value="">Select</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
