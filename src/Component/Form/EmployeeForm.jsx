// import TextInput from "./TextInput";
// import SelectInput from "./SelectInput";
// import FormButton from "./FormButton";


import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import FormButton from "./FormButton"
const EmployeeForm = ({
  name,
  setName,
  role,
  setRole,
  phone,
  setPhone,
  salary,
  setSalary,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="glass p-6 rounded-xl border border-white/10 space-y-4"
    >
      <h2 className="text-lg font-semibold">Add Employee</h2>

      {/* NAME */}
      <TextInput
        label="Employee Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* ROLE */}
      <SelectInput
        label="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        options={["Manager", "Operator", "Accountant", "Helper"]}
        required
      />

      {/* PHONE */}
      <TextInput
        label="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      {/* SALARY */}
      <TextInput
        label="Salary (₹)"
        type="number"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />

      <FormButton text="Save Employee" />
    </form>
  );
};

export default EmployeeForm;
