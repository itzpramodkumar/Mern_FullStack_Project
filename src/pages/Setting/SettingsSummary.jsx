import { useState } from "react";

const SettingsSummary = () => {
  const [lastUpdated, setLastUpdated] = useState(
    new Date().toLocaleString()
  );

  // MOCK SUMMARY (later backend se aayega)
  const summary = [
    { title: "Business Settings", status: "Configured" },
    { title: "Fuel Settings", status: "4 Fuels Active" },
    { title: "Billing & GST", status: "GST Enabled (18%)" },
    { title: "Payment Modes", status: "Cash, UPI, Credit" },
    { title: "Roles & Permissions", status: "4 Roles Defined" },
    { title: "Shift Settings", status: "3 Shifts Active" },
    { title: "Notifications", status: "WhatsApp + Email" },
    { title: "Security", status: "Strong + Audit Enabled" },
    { title: "System Settings", status: "Dark Theme, INR" },
  ];

  const handleReset = () => {
    if (!window.confirm("Reset all settings to default?"))
      return;

    alert("Settings reset to default (mock)");
    setLastUpdated(new Date().toLocaleString());
  };

  const handleExport = () => {
    alert("Settings exported successfully (mock)");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Settings Summary
          </h1>
          <p className="text-sm text-gray-400">
            Complete overview of petrol pump configuration
          </p>
        </div>

        <span className="text-xs text-gray-400">
          Last Updated: {lastUpdated}
        </span>
      </div>

      {/* SUMMARY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {summary.map((item, index) => (
          <div
            key={index}
            className="glass p-5 flex flex-col gap-2"
          >
            <h3 className="font-semibold">
              {item.title}
            </h3>
            <p className="text-sm text-green-400">
              {item.status}
            </p>
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="glass p-6 max-w-3xl space-y-4">
        <h2 className="text-lg font-semibold">
          Global Actions
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={handleExport}
            className="flex-1 px-6 py-3 rounded-xl bg-blue-500 text-black font-semibold"
          >
            Export Settings
          </button>

          <button
            onClick={handleReset}
            className="flex-1 px-6 py-3 rounded-xl bg-red-500 text-black font-semibold"
          >
            Reset to Default
          </button>
        </div>

        <p className="text-xs text-gray-400">
          ⚠ Reset will restore system defaults. Use carefully.
        </p>
      </div>
    </div>
  );
};

export default SettingsSummary;
