import { useState } from "react";

const SecuritySetting = () => {
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    autoLogout: true,
    autoLogoutTime: 30, // minutes
    maxLoginAttempts: 5,
    passwordExpiry: 90, // days
    strongPassword: true,
    auditLogging: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecurity({
      ...security,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    console.log("Security Settings:", security);
    alert("Security settings saved successfully");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Security Settings</h1>
        <p className="text-sm text-gray-400">
          Manage authentication, session and password security
        </p>
      </div>

      {/* AUTHENTICATION */}
      <div className="glass p-6 space-y-4 max-w-3xl">
        <h2 className="text-lg font-semibold">
          Authentication Settings
        </h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Two-Factor Authentication (2FA)</p>
            <p className="text-xs text-gray-400">
              Add extra verification during login
            </p>
          </div>
          <input
            type="checkbox"
            name="twoFactorAuth"
            checked={security.twoFactorAuth}
            onChange={handleChange}
            className="accent-green-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Strong Password Policy</p>
            <p className="text-xs text-gray-400">
              Enforce uppercase, lowercase, number & symbol
            </p>
          </div>
          <input
            type="checkbox"
            name="strongPassword"
            checked={security.strongPassword}
            onChange={handleChange}
            className="accent-green-500"
          />
        </div>
      </div>

      {/* SESSION CONTROL */}
      <div className="glass p-6 space-y-4 max-w-3xl">
        <h2 className="text-lg font-semibold">Session Control</h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Auto Logout</p>
            <p className="text-xs text-gray-400">
              Logout user after inactivity
            </p>
          </div>
          <input
            type="checkbox"
            name="autoLogout"
            checked={security.autoLogout}
            onChange={handleChange}
            className="accent-green-500"
          />
        </div>

        {security.autoLogout && (
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Auto Logout Time (minutes)
            </label>
            <input
              type="number"
              name="autoLogoutTime"
              value={security.autoLogoutTime}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>
        )}
      </div>

      {/* LOGIN RULES */}
      <div className="glass p-6 space-y-4 max-w-3xl">
        <h2 className="text-lg font-semibold">Login Rules</h2>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">
            Maximum Login Attempts
          </label>
          <input
            type="number"
            name="maxLoginAttempts"
            value={security.maxLoginAttempts}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">
            Password Expiry (days)
          </label>
          <input
            type="number"
            name="passwordExpiry"
            value={security.passwordExpiry}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
          />
        </div>
      </div>

      {/* AUDIT */}
      <div className="glass p-6 space-y-4 max-w-3xl">
        <h2 className="text-lg font-semibold">Audit & Monitoring</h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Enable Audit Logs</p>
            <p className="text-xs text-gray-400">
              Track login and security events
            </p>
          </div>
          <input
            type="checkbox"
            name="auditLogging"
            checked={security.auditLogging}
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
        Save Security Settings
      </button>
    </div>
  );
};

export default SecuritySetting;
