import { useState } from "react";

const PaymentSetting = () => {
  const [payment, setPayment] = useState({
    cash: true,
    upi: true,
    card: false,
    credit: true,
    defaultMode: "cash",
    onlineGateway: "razorpay",
    autoSettlement: true,
    settlementTime: "23:30",
  });

  const handleToggle = (key) => {
    setPayment({ ...payment, [key]: !payment[key] });
  };

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Payment Settings:", payment);
    alert("Payment settings saved successfully");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Payment Settings</h1>
        <p className="text-sm text-gray-400">
          Configure accepted payment modes and settlement rules
        </p>
      </div>

      {/* PAYMENT MODES */}
      <div className="glass p-6 space-y-5 max-w-3xl">
        <h2 className="text-lg font-semibold">Payment Modes</h2>

        {[
          { key: "cash", label: "Cash Payment" },
          { key: "upi", label: "UPI / QR Payment" },
          { key: "card", label: "Card (Debit / Credit)" },
          { key: "credit", label: "Credit (Pay Later)" },
        ].map((mode) => (
          <div
            key={mode.key}
            className="flex items-center justify-between"
          >
            <span>{mode.label}</span>
            <input
              type="checkbox"
              checked={payment[mode.key]}
              onChange={() => handleToggle(mode.key)}
              className="accent-green-500"
            />
          </div>
        ))}
      </div>

      {/* DEFAULT PAYMENT */}
      <div className="glass p-6 space-y-4 max-w-3xl">
        <h2 className="text-lg font-semibold">
          Default Payment Mode
        </h2>

        <select
          name="defaultMode"
          value={payment.defaultMode}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
        >
          {payment.cash && <option value="cash">Cash</option>}
          {payment.upi && <option value="upi">UPI</option>}
          {payment.card && <option value="card">Card</option>}
          {payment.credit && (
            <option value="credit">Credit</option>
          )}
        </select>
      </div>

      {/* ONLINE GATEWAY */}
      <div className="glass p-6 space-y-4 max-w-3xl">
        <h2 className="text-lg font-semibold">
          Online Payment Gateway
        </h2>

        <select
          name="onlineGateway"
          value={payment.onlineGateway}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
        >
          <option value="razorpay">Razorpay</option>
          <option value="phonepe">PhonePe</option>
          <option value="paytm">Paytm</option>
          <option value="none">None</option>
        </select>
      </div>

      {/* SETTLEMENT */}
      <div className="glass p-6 space-y-4 max-w-3xl">
        <h2 className="text-lg font-semibold">
          Settlement Settings
        </h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              Auto Daily Settlement
            </p>
            <p className="text-xs text-gray-400">
              Automatically close daily payment summary
            </p>
          </div>
          <input
            type="checkbox"
            checked={payment.autoSettlement}
            onChange={() =>
              handleToggle("autoSettlement")
            }
            className="accent-green-500"
          />
        </div>

        {payment.autoSettlement && (
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Settlement Time
            </label>
            <input
              type="time"
              name="settlementTime"
              value={payment.settlementTime}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>
        )}
      </div>

      {/* SAVE */}
      <button
        onClick={handleSave}
        className="px-6 py-3 rounded-xl bg-green-500 text-black font-semibold"
      >
        Save Payment Settings
      </button>
    </div>
  );
};

export default PaymentSetting;
