import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMusic } from "../context/MusicContext"; 
import { loginApi } from "../../api/auth.api";

const Login = () => {
  const navigate = useNavigate();
  const { playMusic } = useMusic(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin =async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }
try{
    setLoading(true);
    const res=await loginApi({email,password});
    // token save
    localStorage.setItem("token",res.data.token);
    // dashboard
    navigate("/dashboard");
    playMusic();
}
catch(err){
  setError( err.response?.data?.message || "Invalid email or password");
}finally{
  setLoading(false);
}

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      {/* CARD */}
      <div className="glass w-full max-w-md p-8 border border-white/10">
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-wide">
            <span className="text-green-400">Petrol Pump</span> System
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Login to your dashboard
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* EMAIL */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@petrolpump.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          {/* FORGOT */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-green-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-green-500 text-black font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-green-400 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
