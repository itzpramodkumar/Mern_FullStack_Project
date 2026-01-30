const FormButton = ({ text }) => {
  return (
    <button
      type="submit"
      className="w-full py-3 rounded-xl bg-green-500 text-black font-semibold hover:opacity-90 transition"
    >
      {text}
    </button>
  );
};

export default FormButton;
