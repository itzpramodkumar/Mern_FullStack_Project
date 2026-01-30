import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import TextArea from "./TextArea";
import FormButton from "./FormButton";
import { fuelConfig } from "../../pages/Util/fuelConfig";

const FuelForm = ({
  supplier,
  setSupplier,
  quantity,
  setQuantity,
  note,
  setNote,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="glass p-6 rounded-xl border border-white/10 space-y-4"
    >
      <h2 className="text-lg font-semibold">Fuel Purchase</h2>

      {/* SUPPLIER */}
      <SelectInput
        label="Supplier"
        value={supplier}
        onChange={(e) => setSupplier(e.target.value)}
        options={[
          { label: "IOC Distributor", value: "IOC" },
          { label: "BPCL Agency", value: "BPCL" },
          { label: "HPCL Supplier", value: "HPCL" },
        ]}
        required
      />

      {/* QUANTITY */}
      <TextInput
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Enter quantity"
        required
      />

      {/* RATE INFO */}
      <div className="text-sm text-gray-400">
        Current Rate: ₹{fuelConfig.petrol.rate} /{" "}
        {fuelConfig.petrol.unit}
      </div>

      {/* NOTE */}
      <TextArea
        label="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Optional remarks"
      />

      <FormButton text="Save Purchase" />
    </form>
  );
};

export default FuelForm;
