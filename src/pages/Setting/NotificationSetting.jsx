import { useState } from "react";

const NotificationSetting = () => {
  const [notify, setNotify] = useState({
    lowFuelStock: true,
    lowFuelLimit: 500,
    highExpenseAlert: true,
    expenseLimit: 20000,
    dailySummary: true,
    weeklySummary: false,
    email: true,
    sms: false,
    whatsapp: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNotify({
      ...notify,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    console.log("Notification Settings:", notify);
    alert("Notification settings saved successfully");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Notification Settings</h1>
        <p className="text-sm text-gray-400">
          Configure alerts and notification channels
        </p>
      </div>

      {/* STOCK ALERT */}
      <div className="glass p-6 space-y-4 max-w-3xl">
        <h2 className="text-lg font-semibold">Fuel Stock Alerts</h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Low Fuel Stock Alert</p>
            <p className="text-xs text-gray-400">
              Get notified when fuel stock goes below limit
            </p>
          </div>
          <input
            type="checkbox"
            name="lowFuelStock"
            checked={notify.lowFuelStock}
            onChange={handleChange}
            className="accent-green-500"
          />
        </div>

        {notify.lowFuelStock && (
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Minimum Fuel Limit
            </label>
            <input
              type="number"
              name="lowFuelLimit"
              value={notify.lowFuelLimit}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>
        )}
      </div>

      {/* EXPENSE ALERT */}
      <div className="glass p-6 space-y-4 max-w-3xl">
        <h2 className="text-lg font-semibold">Expense Alerts</h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">High Expense Alert</p>
            <p className="text-xs text-gray-400">
              Alert when daily expense crosses limit
            </p>
          </div>
          <input
            type="checkbox"
            name="highExpenseAlert"
            checked={notify.highExpenseAlert}
            onChange={handleChange}
            className="accent-green-500"
          />
        </div>

        {notify.highExpenseAlert && (
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Expense Limit (₹)
            </label>
            <input
              type="number"
              name="expenseLimit"
              value={notify.expenseLimit}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>
        )}
      </div>

      {/* SUMMARY REPORT */}
      <div className="glass p-6 space-y-4 max-w-3xl">
        <h2 className="text-lg font-semibold">Summary Reports</h2>

        <div className="flex items-center justify-between">
          <span>Daily Summary Report</span>
          <input
            type="checkbox"
            name="dailySummary"
            checked={notify.dailySummary}
            onChange={handleChange}
            className="accent-green-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <span>Weekly Summary Report</span>
          <input
            type="checkbox"
            name="weeklySummary"
            checked={notify.weeklySummary}
            onChange={handleChange}
            className="accent-green-500"
          />
        </div>
      </div>

      {/* CHANNELS */}
      <div className="glass p-6 space-y-4 max-w-3xl">
        <h2 className="text-lg font-semibold">
          Notification Channels
        </h2>

        <div className="flex items-center justify-between">
          <span>Email Notifications</span>
          <input
            type="checkbox"
            name="email"
            checked={notify.email}
            onChange={handleChange}
            className="accent-green-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <span>SMS Notifications</span>
          <input
            type="checkbox"
            name="sms"
            checked={notify.sms}
            onChange={handleChange}
            className="accent-green-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <span>WhatsApp Notifications</span>
          <input
            type="checkbox"
            name="whatsapp"
            checked={notify.whatsapp}
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
        Save Notification Settings
      </button>
    </div>
  );
};

export default NotificationSetting;
