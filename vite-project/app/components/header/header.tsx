import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Header = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  return (
    <header className="w-full bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <h1 className="text-xl font-bold">MyApp</h1>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-4">
          {!token ? (
            <>
              <Link to="/login">
                <button className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition">
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">
                <button className="px-4 py-2 border border-white rounded">
                  Dashboard
                </button>
              </Link>

              <Link to="/update-profile">
                <button className="px-4 py-2 border border-white rounded">
                  Update Profile
                </button>
              </Link>

              <Link to="/update-password">
                <button className="px-4 py-2 border border-white rounded">
                  Change Password
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-3 px-4 pb-4">
          {!token ? (
            <>
              <Link to="/login">
                <button className="px-4 py-2 border border-white rounded">
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className="px-4 py-2 bg-blue-500 rounded">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">
                <button className="px-4 py-2 border border-white rounded">
                  Dashboard
                </button>
              </Link>

              <Link to="/update-profile">
                <button className="px-4 py-2 border border-white rounded">
                  Update Profile
                </button>
              </Link>

              <Link to="/update-password">
                <button className="px-4 py-2 border border-white rounded">
                  Change Password
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
