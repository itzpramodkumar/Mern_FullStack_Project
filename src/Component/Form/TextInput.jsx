const TextInput = ({
  label,
  type = "text",
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-400">
        {label} {required && "*"}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-green-500"
      />
    </div>
  );
};

export default TextInput;
