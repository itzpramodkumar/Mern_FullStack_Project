import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import TextArea from "./TextArea";
import FormButton from "./FormButton";

const ExpenseForm = ({
  date,
  setDate,
  category,
  setCategory,
  amount,
  setAmount,
  note,
  setNote,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="glass p-6 rounded-xl border border-white/10 space-y-4"
    >
      <h2 className="text-lg font-semibold">Add Expense</h2>

      {/* DATE */}
      <TextInput
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      {/* CATEGORY */}
      <SelectInput
        label="Expense Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={[
          "Salary",
          "Electricity",
          "Maintenance",
          "Transport",
          "Miscellaneous",
        ]}
        required
      />

      {/* AMOUNT */}
      <TextInput
        label="Amount (₹)"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        required
      />

      {/* NOTE */}
      <TextArea
        label="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Optional details"
      />

      <FormButton text="Save Expense" />
    </form>
  );
};

export default ExpenseForm;
