import { useEffect } from "react";
import { useState } from "react";
import { getBillingSettingApi, saveBillingSettingApi } from "../../api/billingSetting.api";

const BillingSetting = () => {
  const [billing, setBilling] = useState({
    gstEnabled: true,
    gstRate: 18,
    invoicePrefix: "INV-PP",
    startInvoiceNumber: 1001,
    creditBillingAllowed: true,
    creditDays: 15,
    roundOff: true,
    footerNote: "Thank you for choosing our petrol pump.",
  });

  const [loading,setLoading]=useState(false);
  // fetch Existing Setting
  useEffect(()=>{
    const fetchBillingSetting=async()=>{
      try{
        const res=await getBillingSettingApi();
        if(res.data?.data){
          setBilling(res.data.data);
        }

      }
catch(error){
  console.log(error)
}
    }
    fetchBillingSetting();
  },[]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBilling({
      ...billing,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async () => {
    try{
      setLoading(true);
      await saveBillingSettingApi(billing);
      alert("Billing &tax setting saved successfully")
    }
    catch(error){
      console.log(error)
      alert("failed to save billing");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Billing & Tax Settings</h1>
        <p className="text-sm text-gray-400">
          Configure GST, invoice format and credit billing rules
        </p>
      </div>

      {/* CARD */}
      <div className="glass p-6 space-y-5 max-w-3xl">
        {/* GST */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Enable GST</h3>
            <p className="text-xs text-gray-400">
              Apply GST on fuel invoices
            </p>
          </div>
          <input
            type="checkbox"
            name="gstEnabled"
            checked={billing.gstEnabled}
            onChange={handleChange}
            className="accent-green-500"
          />
        </div>

        {billing.gstEnabled && (
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              GST Rate (%)
            </label>
            <input
              type="number"
              name="gstRate"
              value={billing.gstRate}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>
        )}

        {/* INVOICE PREFIX */}
        <div>
          <label className="text-sm text-gray-400 mb-1 block">
            Invoice Prefix
          </label>
          <input
            name="invoicePrefix"
            value={billing.invoicePrefix}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
          />
        </div>

        {/* START NUMBER */}
        <div>
          <label className="text-sm text-gray-400 mb-1 block">
            Starting Invoice Number
          </label>
          <input
            type="number"
            name="startInvoiceNumber"
            value={billing.startInvoiceNumber}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
          />
        </div>

        {/* CREDIT BILLING */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Allow Credit Billing</h3>
            <p className="text-xs text-gray-400">
              Allow customers to pay later
            </p>
          </div>
          <input
            type="checkbox"
            name="creditBillingAllowed"
            checked={billing.creditBillingAllowed}
            onChange={handleChange}
            className="accent-green-500"
          />
        </div>

        {billing.creditBillingAllowed && (
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Credit Due Days
            </label>
            <input
              type="number"
              name="creditDays"
              value={billing.creditDays}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>
        )}

        {/* ROUND OFF */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Round Off Amount</h3>
            <p className="text-xs text-gray-400">
              Automatically round final bill amount
            </p>
          </div>
          <input
            type="checkbox"
            name="roundOff"
            checked={billing.roundOff}
            onChange={handleChange}
            className="accent-green-500"
          />
        </div>

        {/* FOOTER NOTE */}
        <div>
          <label className="text-sm text-gray-400 mb-1 block">
            Invoice Footer Note
          </label>
          <textarea
            name="footerNote"
            value={billing.footerNote}
            onChange={handleChange}
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 resize-none"
          />
        </div>

        {/* SAVE */}
        <button
          onClick={handleSave}
          className="mt-4 px-6 py-3 rounded-xl bg-green-500 text-black font-semibold"
        >
          Save Billing Settings
        </button>
      </div>
    </div>
  );
};

export default BillingSetting;
