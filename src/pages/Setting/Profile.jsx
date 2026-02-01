import { useEffect, useState } from "react";
import Sidebar from "../../Component/common/Sidebar";
import Navbar from "../../Component/common/Navbar";

/* ===== backend-ready default shape ===== */
const emptyProfile = {
  name: "",
  email: "",
  phone: "",
  role: "",
  avatar: null,
  lastActive: null,
};

const Profile = () => {
  /* ================= STATE ================= */
  const [profile, setProfile] = useState(emptyProfile);
  const [form, setForm] = useState(emptyProfile);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  /* ================= FORM HANDLERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  /* ================= SAVE (FRONTEND ONLY) ================= */
  const handleSave = () => {
    setProfile(form);
    alert("Profile data saved locally (backend later)");
  };

  /* ================= PASSWORD (FRONTEND ONLY) ================= */
  const handlePasswordChange = () => {
    if (!passwords.currentPassword || !passwords.newPassword) return;
    alert("Password updated (backend later)");
    setPasswords({ currentPassword: "", newPassword: "" });
    setShowPasswordModal(false);
  };

  /* ================= LAST ACTIVE (UI ONLY) ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setProfile((p) => ({
        ...p,
        lastActive: new Date().toLocaleString(),
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  /* ================= UI ================= */
  return (
    <div className="flex min-h-screen bg-[#020617]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">My Profile</h1>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* ===== FORM ===== */}
            <div className="xl:col-span-2 glass p-6 space-y-4">
              <h2 className="text-lg font-semibold">Edit Profile</h2>

              <input type="file" onChange={handleImageUpload} />

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />

              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="Role"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />

              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  className="px-6 py-3 rounded-xl bg-green-500 text-black font-semibold"
                >
                  Save (Frontend Only)
                </button>

                <button
                  onClick={() => setForm(profile)}
                  className="px-6 py-3 rounded-xl bg-white/10"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* ===== PROFILE CARD ===== */}
            <div className="glass p-6 text-center space-y-3">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                  alt="avatar"
                />
              ) : (
                <div className="w-24 h-24 rounded-full mx-auto bg-green-500/20 flex items-center justify-center text-3xl font-bold text-green-400">
                  ?
                </div>
              )}

              <h3 className="text-xl font-semibold">
                {profile.name || "Your Name"}
              </h3>
              <p className="text-sm text-gray-400">
                {profile.role || "Role"}
              </p>
              <p>{profile.email || "Email"}</p>
              <p>{profile.phone || "Phone"}</p>

              <p className="text-xs text-gray-400">
                Last Active: {profile.lastActive || "—"}
              </p>

              <button
                onClick={() => setShowPasswordModal(true)}
                className="mt-3 px-4 py-2 bg-white/10 rounded-xl"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== PASSWORD MODAL ===== */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="glass p-6 w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold">Change Password</h2>

            <input
              type="password"
              placeholder="Current password"
              value={passwords.currentPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  currentPassword: e.target.value,
                })
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            />

            <input
              type="password"
              placeholder="New password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  newPassword: e.target.value,
                })
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 bg-white/10 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handlePasswordChange}
                className="px-4 py-2 bg-green-500 text-black rounded-xl font-semibold"
              >
                Update (Later Backend)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
