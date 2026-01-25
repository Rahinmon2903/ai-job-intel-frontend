import { useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMessage(res.data.message || "If the email exists, a reset link was sent.");
    } catch {
      setMessage("Unable to process request.");
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
            Reset your password
          </h1>

          <p className="mt-3 text-sm text-neutral-400 max-w-md">
            Enter the email associated with your account.  
            If it exists, we’ll send a secure reset link.
          </p>

          {message && (
            <div className="mt-6 text-sm text-neutral-300 border border-neutral-800 bg-neutral-900/60 px-4 py-3 rounded-lg">
              {message}
            </div>
          )}

          <form onSubmit={submit} className="mt-10 space-y-8">
            <div>
              <label className="block text-xs text-neutral-500 mb-2">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
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
              {loading ? "Generating secure link…" : "Send reset link"}
            </button>
          </form>

          <div className="mt-10 flex items-center justify-between text-sm text-neutral-500">
            <Link
              to="/login"
              className="hover:text-neutral-300 underline underline-offset-4"
            >
              Back to login
            </Link>

            <span className="text-xs">
              Link expires in 15 minutes
            </span>
          </div>
        </div>

        {/* FOOTER */}
        <p className="mt-10 text-xs text-neutral-600">
          For security reasons, we don’t reveal whether an email exists.
        </p>
      </div>
    </div>
  );
}
