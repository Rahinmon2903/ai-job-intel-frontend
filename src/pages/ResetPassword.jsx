import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await api.post(`/auth/reset-password/${token}`, { password });
      navigate("/login");
    } catch {
      setError("Invalid or expired reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-lg">
        {/* BRAND */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.35em] text-neutral-500 uppercase">
            Resume Intelligence
          </p>
        </div>

        {/* CARD */}
        <div className="border border-neutral-800 rounded-2xl bg-neutral-950 p-10">
          <h1 className="text-3xl font-medium tracking-tight">
            Set a new password
          </h1>

          <p className="mt-3 text-sm text-neutral-400 max-w-md">
            Choose a strong password.  
            This will replace your previous credentials.
          </p>

          {error && (
            <div className="mt-6 text-sm text-red-400 border border-red-500/20 bg-red-500/10 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="mt-10 space-y-8">
            <div>
              <label className="block text-xs text-neutral-500 mb-2">
                New password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full bg-black border border-neutral-800 rounded-md px-4 py-3 text-sm
                           focus:outline-none focus:border-white transition"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-500 mb-2">
                Confirm password
              </label>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat new password"
                className="w-full bg-black border border-neutral-800 rounded-md px-4 py-3 text-sm
                           focus:outline-none focus:border-white transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2
                         border border-white py-3 text-sm font-medium rounded-md
                         hover:bg-white hover:text-black transition
                         disabled:opacity-40"
            >
              {loading ? "Updating password…" : "Reset password"}
            </button>
          </form>

          <div className="mt-10 flex items-center justify-between text-sm text-neutral-500">
            <span className="text-xs">
              Reset links expire in 15 minutes
            </span>
          </div>
        </div>

        {/* FOOTER */}
        <p className="mt-10 text-xs text-neutral-600">
          If the link is expired, request a new reset email.
        </p>
      </div>
    </div>
  );
}
