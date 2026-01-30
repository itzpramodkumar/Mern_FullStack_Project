import { useState } from "react";

const BusinessSetting = () => {
  const [business, setBusiness] = useState({
    pumpName: "ABC Petrol Pump",
    ownerName: "Ramesh Kumar",
    gstin: "09ABCDE1234F1Z5",
    licenseNo: "HP-IOCL-998877",
    address: "NH-24, Ghaziabad, Uttar Pradesh",
    contact: "9876543210",
    openTime: "06:00",
    closeTime: "23:00",
  });

  const handleChange = (e) => {
    setBusiness({
      ...business,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log("Business Settings:", business);
    alert("Business settings saved successfully");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Business Settings</h1>
        <p className="text-sm text-gray-400">
          Manage petrol pump basic and legal information
        </p>
      </div>

      {/* CARD */}
      <div className="glass p-6 space-y-4 max-w-3xl">
        {/* Pump Name */}
        <div>
          <label className="text-sm text-gray-400 mb-1 block">
            Petrol Pump Name
          </label>
          <input
            name="pumpName"
            value={business.pumpName}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
          />
        </div>

        {/* Owner */}
        <div>
          <label className="text-sm text-gray-400 mb-1 block">
            Owner Name
          </label>
          <input
            name="ownerName"
            value={business.ownerName}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
          />
        </div>

        {/* GST + LICENSE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              GSTIN
            </label>
            <input
              name="gstin"
              value={business.gstin}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Fuel License No.
            </label>
            <input
              name="licenseNo"
              value={business.licenseNo}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>
        </div>

        {/* ADDRESS */}
        <div>
          <label className="text-sm text-gray-400 mb-1 block">
            Address
          </label>
          <textarea
            name="address"
            value={business.address}
            onChange={handleChange}
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 resize-none"
          />
        </div>

        {/* CONTACT */}
        <div>
          <label className="text-sm text-gray-400 mb-1 block">
            Contact Number
          </label>
          <input
            name="contact"
            value={business.contact}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
          />
        </div>

        {/* WORKING HOURS */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Opening Time
            </label>
            <input
              type="time"
              name="openTime"
              value={business.openTime}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Closing Time
            </label>
            <input
              type="time"
              name="closeTime"
              value={business.closeTime}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>
        </div>

        {/* SAVE */}
        <button
          onClick={handleSave}
          className="mt-4 px-6 py-3 rounded-xl bg-green-500 text-black font-semibold"
        >
          Save Business Settings
        </button>
      </div>
    </div>
  );
};

export default BusinessSetting;
