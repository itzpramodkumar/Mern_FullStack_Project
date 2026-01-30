// import { useState } from "react";
// import { Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import FuelSwitcher from "./FuelSwitcher";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <header className="h-16 px-6 flex items-center justify-between bg-[#020617]/80 backdrop-blur border-b border-white/10">
//       {/* LEFT */}
//       <h2 className="text-lg font-semibold tracking-wide text-gray-100">
//         Admin Dashboard
//       </h2>

//       {/* CENTER */}
//       <FuelSwitcher />

//       {/* RIGHT */}
//       <div className="flex items-center gap-6 relative">
//         {/* Notifications */}
//         <button className="relative p-2 rounded-full hover:bg-white/5 transition">
//           <Bell className="w-5 h-5 text-gray-300" />
//           <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
//         </button>

//         {/* PROFILE */}
//         <div className="relative">
//           <button
//             onClick={() => setOpen(!open)}
//             className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 transition"
//           >
//             <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
//               <User className="w-4 h-4 text-green-400" />
//             </div>
//             <span className="text-sm text-gray-200">Admin</span>
//             <ChevronDown className="w-4 h-4 text-gray-400" />
//           </button>

//           {/* DROPDOWN */}
//           {open && (
//             <div className="absolute right-0 mt-3 w-48 glass border border-white/10 shadow-lg z-50">
//               <button
//                 onClick={() => {
//                   navigate("/profile");
//                   setOpen(false);
//                 }}
//                 className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/5 transition"
//               >
//                 <User className="w-4 h-4 text-gray-300" />
//                 Profile
//               </button>

//               <button
//                 onClick={() => {
//                   navigate("/settings");
//                   setOpen(false);
//                 }}
//                 className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/5 transition"
//               >
//                 <Settings className="w-4 h-4 text-gray-300" />
//                 Settings
//               </button>

//               <div className="border-t border-white/10" />

//               <button
//                 onClick={() => {
//                   localStorage.clear(); // auth clear (optional)
//                   navigate("/");
//                 }}
//                 className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition"
//               >
//                 <LogOut className="w-4 h-4" />
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


import { useState } from "react";
import { Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FuelSwitcher from "./FuelSwitcher";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="relative z-40 h-16 px-6 flex items-center justify-between bg-[#020617]/80 backdrop-blur border-b border-white/10">
      {/* LEFT */}
      <h2 className="text-lg font-semibold tracking-wide text-gray-100">
        Admin Dashboard
      </h2>

      {/* CENTER */}
      <div className="relative z-10">
        <FuelSwitcher />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6 relative">
        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-white/5 transition">
          <Bell className="w-5 h-5 text-gray-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
        </button>

        {/* PROFILE */}
        <div className="relative">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 transition"
          >
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <User className="w-4 h-4 text-green-400" />
            </div>
            <span className="text-sm text-gray-200">Admin</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-3 w-48 z-50 rounded-xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-xl overflow-hidden">
              <button
                onClick={() => {
                  navigate("/profile");
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-white/10 transition"
              >
                <User className="w-4 h-4 text-gray-300" />
                Profile
              </button>

              <button
                onClick={() => {
                  navigate("/settings");
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-white/10 transition"
              >
                <Settings className="w-4 h-4 text-gray-300" />
                Settings
              </button>

              <div className="border-t border-white/10" />

              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
