import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", { name, email, password });
      toast.success("Account created");
      navigate("/login");
    } catch {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* LEFT — PRODUCT STATEMENT */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between px-20 py-16 border-r border-neutral-800">
        <div>
          <p className="text-xs tracking-[0.25em] text-neutral-500 uppercase">
            Resume Intelligence
          </p>

          <h1 className="mt-6 text-5xl font-medium leading-tight tracking-tight">
            Know exactly <br />
            where you stand.
          </h1>

          <p className="mt-6 max-w-sm text-neutral-400 text-sm leading-relaxed">
            AI-driven analysis that compares your resume against real job
            descriptions and exposes skill gaps before recruiters do.
          </p>
        </div>

        <p className="text-xs text-neutral-600">
          Match scoring · Skill gaps · Hiring readiness
        </p>
      </div>

      {/* RIGHT — FORM */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6">
        <form
          onSubmit={submit}
          className="w-full max-w-sm"
        >
          {/* Mobile heading */}
          <div className="lg:hidden mb-10">
            <p className="text-xs tracking-[0.25em] text-neutral-500 uppercase">
              Resume Intelligence
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight">
              Create account
            </h2>
          </div>

          <h2 className="hidden lg:block text-2xl font-medium tracking-tight mb-10">
            Create account
          </h2>

          <div className="space-y-8">
            <div>
              <label className="block text-xs text-neutral-500 mb-2">
                Full name
              </label>
              <input
                className="w-full bg-transparent border-b border-neutral-700 py-3 text-sm
                           focus:outline-none focus:border-white transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-500 mb-2">
                Email address
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-neutral-700 py-3 text-sm
                           focus:outline-none focus:border-white transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-500 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full bg-transparent border-b border-neutral-700 py-3 text-sm
                           focus:outline-none focus:border-white transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="mt-14 w-full border border-white py-3 text-sm font-medium
                       hover:bg-white hover:text-black transition disabled:opacity-50"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>

          <p className="mt-8 text-sm text-neutral-500">
            Already have an account?{" "}
            <Link to="/login" className="text-white underline underline-offset-4">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
