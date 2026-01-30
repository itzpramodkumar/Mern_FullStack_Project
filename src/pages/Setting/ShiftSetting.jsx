import { useState } from "react";

const ShiftSetting = () => {
  const [shift, setShift] = useState({
    morningStart: "06:00",
    morningEnd: "14:00",
    eveningStart: "14:00",
    eveningEnd: "22:00",
    nightEnabled: false,
    nightStart: "22:00",
    nightEnd: "06:00",
    cashLimit: 50000,
    mandatoryHandover: true,
    autoEndShiftReport: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShift({
      ...shift,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    console.log("Shift Settings:", shift);
    alert("Shift settings saved successfully");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Shift & Operations Settings</h1>
        <p className="text-sm text-gray-400">
          Configure shift timings, cash rules and handover policies
        </p>
      </div>

      {/* SHIFT TIMINGS */}
      <div className="glass p-6 space-y-4 max-w-3xl">
        <h2 className="text-lg font-semibold">Shift Timings</h2>

        {/* MORNING */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Morning Shift Start
            </label>
            <input
              type="time"
              name="morningStart"
              value={shift.morningStart}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Morning Shift End
            </label>
            <input
              type="time"
              name="morningEnd"
              value={shift.morningEnd}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>
        </div>

        {/* EVENING */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Evening Shift Start
            </label>
            <input
              type="time"
              name="eveningStart"
              value={shift.eveningStart}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Evening Shift End
            </label>
            <input
              type="time"
              name="eveningEnd"
              value={shift.eveningEnd}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>
        </div>

        {/* NIGHT SHIFT */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <h3 className="font-medium">Enable Night Shift</h3>
            <p className="text-xs text-gray-400">
              Optional late-night operation
            </p>
          </div>
          <input
            type="checkbox"
            name="nightEnabled"
            checked={shift.nightEnabled}
            onChange={handleChange}
            className="accent-green-500"
          />
        </div>

        {shift.nightEnabled && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Night Shift Start
              </label>
              <input
                type="time"
                name="nightStart"
                value={shift.nightStart}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Night Shift End
              </label>
              <input
                type="time"
                name="nightEnd"
                value={shift.nightEnd}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />
            </div>
          </div>
        )}
      </div>

      {/* CASH & HANDOVER */}
      <div className="glass p-6 space-y-4 max-w-3xl">
        <h2 className="text-lg font-semibold">Cash & Handover Rules</h2>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">
            Maximum Cash Limit per Shift (₹)
          </label>
          <input
            type="number"
            name="cashLimit"
            value={shift.cashLimit}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Mandatory Shift Handover</p>
            <p className="text-xs text-gray-400">
              Operator must hand over cash & stock
            </p>
          </div>
          <input
            type="checkbox"
            name="mandatoryHandover"
            checked={shift.mandatoryHandover}
            onChange={handleChange}
            className="accent-green-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Auto End-Shift Report</p>
            <p className="text-xs text-gray-400">
              Generate report when shift ends
            </p>
          </div>
          <input
            type="checkbox"
            name="autoEndShiftReport"
            checked={shift.autoEndShiftReport}
            onChange={handleChange}
            className="accent-green-500"
          />
        </div>
      </div>

      {/* SAVE */}
      <button
        onClick={handleSave}
        className="px-6 py-3 rounded-xl bg-green-500 text-black font-semibold"
      >
        Save Shift Settings
      </button>
    </div>
  );
};

export default ShiftSetting;
