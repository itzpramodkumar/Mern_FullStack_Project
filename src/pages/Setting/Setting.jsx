import { useState } from "react";
import Sidebar from "../../Component/common/Sidebar";
import Navbar from "../../Component/common/Navbar";

const Setting = () => {
  const [pumpName, setPumpName] = useState("ABC Petrol Pump");
  const [gstEnabled, setGstEnabled] = useState(true);
  const [theme, setTheme] = useState("dark");

  const handleSave = () => {
    console.log({ pumpName, gstEnabled, theme });
    alert("Settings saved successfully");
  };

  return (
    <div className="flex min-h-screen bg-[#020617]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6 max-w-xl space-y-6">
          <h1 className="text-2xl font-bold">Application Settings</h1>

          <div className="glass p-6 space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Petrol Pump Name
              </label>
              <input
                value={pumpName}
                onChange={(e) => setPumpName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={gstEnabled}
                onChange={() => setGstEnabled(!gstEnabled)}
                className="accent-green-500"
              />
              <span className="text-sm text-gray-300">
                Enable GST Billing
              </span>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Theme
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>

            <button
              onClick={handleSave}
              className="w-full py-3 rounded-xl bg-green-500 text-black font-semibold"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
