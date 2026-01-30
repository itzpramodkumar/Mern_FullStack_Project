import { useState } from "react";

const SystemSetting = () => {
  const [system, setSystem] = useState({
    theme: "dark",
    language: "en",
    dateFormat: "DD/MM/YYYY",
    timeZone: "Asia/Kolkata",
    currency: "INR",
    autoBackup: true,
    backupFrequency: "daily",
    maintenanceMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSystem({
      ...system,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    console.log("System Settings:", system);
    alert("System settings saved successfully");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">System Settings</h1>
        <p className="text-sm text-gray-400">
          Control application appearance, localization and maintenance
        </p>
      </div>

      {/* APPEARANCE */}
      <div className="glass p-6 space-y-4 max-w-3xl">
        <h2 className="text-lg font-semibold">Appearance</h2>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">
            Theme
          </label>
          <select
            name="theme"
            value={system.theme}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </div>

      {/* LOCALIZATION */}
      <div className="glass p-6 space-y-4 max-w-3xl">
        <h2 className="text-lg font-semibold">Localization</h2>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">
            Language
          </label>
          <select
            name="language"
            value={system.language}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">
            Date Format
          </label>
          <select
            name="dateFormat"
            value={system.dateFormat}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">
            Time Zone
          </label>
          <select
            name="timeZone"
            value={system.timeZone}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
          >
            <option value="Asia/Kolkata">Asia / Kolkata</option>
            <option value="UTC">UTC</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">
            Currency
          </label>
          <select
            name="currency"
            value={system.currency}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
          >
            <option value="INR">₹ INR</option>
            <option value="USD">$ USD</option>
          </select>
        </div>
      </div>

      {/* BACKUP */}
      <div className="glass p-6 space-y-4 max-w-3xl">
        <h2 className="text-lg font-semibold">Backup Settings</h2>

        <div className="flex items-center justify-between">
          <span>Enable Auto Backup</span>
          <input
            type="checkbox"
            name="autoBackup"
            checked={system.autoBackup}
            onChange={handleChange}
            className="accent-green-500"
          />
        </div>

        {system.autoBackup && (
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Backup Frequency
            </label>
            <select
              name="backupFrequency"
              value={system.backupFrequency}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        )}
      </div>

      {/* MAINTENANCE */}
      <div className="glass p-6 space-y-4 max-w-3xl">
        <h2 className="text-lg font-semibold">Maintenance Mode</h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Enable Maintenance Mode</p>
            <p className="text-xs text-gray-400">
              Temporarily disable access for non-admin users
            </p>
          </div>
          <input
            type="checkbox"
            name="maintenanceMode"
            checked={system.maintenanceMode}
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
        Save System Settings
      </button>
    </div>
  );
};

export default SystemSetting;
