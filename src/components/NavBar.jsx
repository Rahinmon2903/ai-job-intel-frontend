import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `text-sm tracking-wide transition ${
      isActive
        ? "text-white"
        : "text-neutral-400 hover:text-neutral-200"
    }`;

  return (
    <nav className="w-full border-b border-neutral-800 bg-black">
      <div className="flex items-center justify-between px-10 py-4">
        {/* BRAND */}
        <div className="flex items-center gap-4">
          <div className="text-xs tracking-[0.35em] text-neutral-500 uppercase">
            Resume Intelligence
          </div>
        </div>

        {/* LINKS */}
        <div className="flex items-center gap-10">
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/history" className={linkClass}>
            History
          </NavLink>

          <NavLink to="/skills" className={linkClass}>
            Skill Gaps
          </NavLink>

          <button
            onClick={logout}
            className="text-sm text-neutral-500 hover:text-red-400 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
