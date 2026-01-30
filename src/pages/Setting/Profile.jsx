// import { useEffect, useState } from "react";
// import Sidebar from "../../Component/common/Sidebar";
// import Navbar from "../../Component/common/Navbar";

// const Profile = () => {
//   const [profile, setProfile] = useState({
//     name: "Admin User",
//     email: "admin@petrolpump.com",
//     phone: "9876543210",
//     role: "Administrator",
//     online: true,
//     avatar: null,
//     lastActive: new Date(),
//   });

//   const [auditLogs, setAuditLogs] = useState([]);
//   const [showPasswordModal, setShowPasswordModal] = useState(false);
//   const [passwords, setPasswords] = useState({
//     current: "",
//     new: "",
//   });

//   /* ================= HELPERS ================= */

//   const addAudit = (action) => {
//     setAuditLogs((prev) => [
//       {
//         id: Date.now(),
//         action,
//         time: new Date().toLocaleString(),
//       },
//       ...prev,
//     ]);
//   };

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   /* ================= IMAGE UPLOAD (FORM) ================= */

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = () => {
//       setProfile((p) => ({ ...p, avatar: reader.result }));
//       addAudit("Profile image updated");
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSave = () => {
//     addAudit("Profile details updated");
//     alert("Profile updated successfully");
//   };

//   /* ================= PASSWORD ================= */

//   const handlePasswordChange = () => {
//     if (!passwords.current || !passwords.new) return;
//     addAudit("Password changed");
//     setPasswords({ current: "", new: "" });
//     setShowPasswordModal(false);
//     alert("Password updated");
//   };

//   /* ================= LAST ACTIVE ================= */

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProfile((p) => ({ ...p, lastActive: new Date() }));
//     }, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-[#020617]">
//       <Sidebar />

//       <div className="flex-1 flex flex-col">
//         <Navbar />

//         <div className="p-6 space-y-6">
//           <h1 className="text-2xl font-bold">My Profile</h1>

//           <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//             {/* ================= FORM ================= */}
//             <div className="xl:col-span-2 glass p-6 space-y-4">
//               <h2 className="text-lg font-semibold">Edit Profile</h2>

//               {/* IMAGE UPLOAD */}
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">
//                   Profile Image
//                 </label>
//                 <input
//                   type="file"
//                   onChange={handleImageUpload}
//                   className="block w-full text-sm text-gray-400"
//                 />
//               </div>

//               <input
//                 name="name"
//                 value={profile.name}
//                 onChange={handleChange}
//                 placeholder="Full Name"
//                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
//               />

//               <input
//                 name="email"
//                 value={profile.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
//               />

//               <input
//                 name="phone"
//                 value={profile.phone}
//                 onChange={handleChange}
//                 placeholder="Phone"
//                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
//               />

//               <input
//                 name="role"
//                 value={profile.role}
//                 onChange={handleChange}
//                 placeholder="Role"
//                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
//               />

//               <div className="flex gap-4">
//                 <button
//                   onClick={handleSave}
//                   className="px-6 py-3 rounded-xl bg-green-500 text-black font-semibold"
//                 >
//                   Save Profile
//                 </button>

//                 <button
//                   onClick={() => setShowPasswordModal(true)}
//                   className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20"
//                 >
//                   Change Password
//                 </button>
//               </div>
//             </div>

//             {/* ================= PROFILE CARD ================= */}
//             <div className="glass p-6 text-center space-y-3">
//               <div className="relative mx-auto w-24 h-24">
//                 {profile.avatar ? (
//                   <img
//                     src={profile.avatar}
//                     className="w-24 h-24 rounded-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center text-3xl font-bold text-green-400">
//                     {profile.name.charAt(0)}
//                   </div>
//                 )}

//                 <span
//                   className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-[#020617] ${
//                     profile.online ? "bg-green-500" : "bg-gray-500"
//                   }`}
//                 />
//               </div>

//               <h3 className="text-xl font-semibold text-center">
//                 {profile.name}
//               </h3>
//               <p className="text-sm text-gray-400 text-center">
//                 {profile.role}
//               </p>

//               <p className="text-sm text-center">{profile.email}</p>
//               <p className="text-sm text-center">{profile.phone}</p>

//               <p className="text-xs text-gray-400 text-center">
//                 Last Active: {profile.lastActive.toLocaleString()}
//               </p>

//               <span
//                 className={`inline-block px-4 py-1 rounded-full text-sm ${
//                   profile.online
//                     ? "bg-green-500/10 text-green-400"
//                     : "bg-gray-500/10 text-gray-400"
//                 }`}
//               >
//                 {profile.online ? "Online" : "Offline"}
//               </span>
//             </div>
//           </div>

//           {/* ================= AUDIT LOG ================= */}
//           <div className="glass p-6">
//             <h2 className="text-lg font-semibold mb-3">
//               Activity Log
//             </h2>

//             {auditLogs.length === 0 ? (
//               <p className="text-sm text-gray-400">
//                 No activity yet
//               </p>
//             ) : (
//               <ul className="space-y-2 text-sm">
//                 {auditLogs.map((log) => (
//                   <li
//                     key={log.id}
//                     className="flex justify-between border-b border-white/5 pb-1"
//                   >
//                     <span>{log.action}</span>
//                     <span className="text-gray-400">{log.time}</span>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ================= PASSWORD MODAL ================= */}
//       {showPasswordModal && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="glass p-6 w-full max-w-md space-y-4">
//             <h2 className="text-lg font-semibold">
//               Change Password
//             </h2>

//             <input
//               type="password"
//               placeholder="Current password"
//               value={passwords.current}
//               onChange={(e) =>
//                 setPasswords({ ...passwords, current: e.target.value })
//               }
//               className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
//             />

//             <input
//               type="password"
//               placeholder="New password"
//               value={passwords.new}
//               onChange={(e) =>
//                 setPasswords({ ...passwords, new: e.target.value })
//               }
//               className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
//             />

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setShowPasswordModal(false)}
//                 className="px-4 py-2 bg-white/10 rounded-xl"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handlePasswordChange}
//                 className="px-4 py-2 bg-green-500 text-black rounded-xl font-semibold"
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;



import { useEffect, useState } from "react";
import Sidebar from "../../Component/common/Sidebar";
import Navbar from "../../Component/common/Navbar";

const defaultProfile = {
  name: "Admin User",
  email: "admin@petrolpump.com",
  phone: "9876543210",
  role: "Administrator",
  online: true,
  avatar: null,
  lastActive: new Date().toISOString(),
};

const Profile = () => {
  /* ================= STATE ================= */

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("profile");
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  const [tempProfile, setTempProfile] = useState(profile);
  const [auditLogs, setAuditLogs] = useState([]);

  /* ================= HELPERS ================= */

  const addAudit = (action) => {
    setAuditLogs((prev) => [
      {
        id: Date.now(),
        action,
        time: new Date().toLocaleString(),
      },
      ...prev,
    ]);
  };

  /* ================= FORM HANDLERS ================= */

  const handleChange = (e) => {
    setTempProfile({ ...tempProfile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setTempProfile((p) => ({ ...p, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  /* ================= SAVE PROFILE ================= */

  const handleSave = () => {
    setProfile(tempProfile);
    localStorage.setItem("profile", JSON.stringify(tempProfile));
    addAudit("Profile updated");
    alert("Profile saved successfully");
  };

  /* ================= LAST ACTIVE ================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setProfile((p) => ({
        ...p,
        lastActive: new Date().toISOString(),
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#020617]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">My Profile</h1>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* ================= FORM ================= */}
            <div className="xl:col-span-2 glass p-6 space-y-4">
              <h2 className="text-lg font-semibold">Edit Profile</h2>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Profile Image
                </label>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-400"
                />
              </div>

              <input
                name="name"
                value={tempProfile.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />

              <input
                name="email"
                value={tempProfile.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />

              <input
                name="phone"
                value={tempProfile.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />

              <input
                name="role"
                value={tempProfile.role}
                onChange={handleChange}
                placeholder="Role"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />

              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  className="px-6 py-3 rounded-xl bg-green-500 text-black font-semibold"
                >
                  Save Profile
                </button>

                <button
                  onClick={() => setTempProfile(profile)}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20"
                >
                  Discard Changes
                </button>
              </div>
            </div>

            {/* ================= PROFILE CARD ================= */}
            <div className="glass p-6 text-center space-y-3">
              <div className="relative mx-auto w-24 h-24">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    className="w-24 h-24 rounded-full object-cover"
                    alt="avatar"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center text-3xl font-bold text-green-400">
                    {profile.name.charAt(0)}
                  </div>
                )}

                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-[#020617] bg-green-500" />
              </div>

              <h3 className="text-xl font-semibold">{profile.name}</h3>
              <p className="text-sm text-gray-400">{profile.role}</p>
              <p className="text-sm">{profile.email}</p>
              <p className="text-sm">{profile.phone}</p>

              <p className="text-xs text-gray-400">
                Last Active:{" "}
                {new Date(profile.lastActive).toLocaleString()}
              </p>
            </div>
          </div>

          {/* ================= AUDIT LOG ================= */}
          <div className="glass p-6">
            <h2 className="text-lg font-semibold mb-3">
              Activity Log
            </h2>

            {auditLogs.length === 0 ? (
              <p className="text-sm text-gray-400">
                No activity yet
              </p>
            ) : (
              <ul className="space-y-2 text-sm">
                {auditLogs.map((log) => (
                  <li
                    key={log.id}
                    className="flex justify-between border-b border-white/5 pb-1"
                  >
                    <span>{log.action}</span>
                    <span className="text-gray-400">{log.time}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

