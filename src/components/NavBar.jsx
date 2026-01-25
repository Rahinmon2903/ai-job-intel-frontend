import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiBarChart2,
  FiTrendingUp,
  FiLogOut
} from "react-icons/fi";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 text-sm tracking-wide transition ${
      isActive
        ? "text-white"
        : "text-neutral-400 hover:text-neutral-200"
    }`;

  return (
    <nav className="w-full border-b border-neutral-800 bg-black">
      <div className="flex items-center justify-between px-10 py-4">
        {/* BRAND */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md border border-neutral-700
                          flex items-center justify-center text-xs
                          tracking-widest text-neutral-300">
            RI
          </div>
          <span className="text-xs tracking-[0.35em] text-neutral-500 uppercase">
            Resume Intelligence
          </span>
        </div>

        {/* LINKS */}
        <div className="flex items-center gap-10">
          <NavLink to="/dashboard" className={linkClass}>
            <FiGrid size={16} />
            Dashboard
          </NavLink>

          <NavLink to="/history" className={linkClass}>
            <FiBarChart2 size={16} />
            History
          </NavLink>

          <NavLink to="/skills" className={linkClass}>
            <FiTrendingUp size={16} />
            Skill Gaps
          </NavLink>

          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm
                       text-neutral-500 hover:text-red-400 transition"
          >
            <FiLogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
