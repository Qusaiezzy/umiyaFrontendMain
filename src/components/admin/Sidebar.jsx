import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ setActive }) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const activeModule = localStorage.getItem("activeModule") || "dashboard";

  const changeModule = (module) => {
    localStorage.setItem("activeModule", module);

    setActive(module);

    setOpen(false);
  };

  const logout = () => {
    localStorage.clear();

    navigate("/login");
  };

  return (
    <>
      {/* Hamburger */}

      <button
        onClick={() => setOpen(!open)}
        className="
        md:hidden
        fixed
        top-4
        left-4
        z-50
        bg-yellow-400
        p-3
        rounded-lg
        "
      >
        ☰
      </button>

      {/* Overlay */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
          md:hidden
          fixed
          inset-0
          bg-black/50
          z-30
          "
        ></div>
      )}

      <aside
        className={`

        fixed

        md:sticky

        top-0

        left-0

        h-screen

        w-64

        bg-gray-900

        text-white

        p-6

        z-40

        transition-transform


        ${open ? "translate-x-0" : "-translate-x-full"}


        md:translate-x-0


        `}
      >
        <h1
          className="
          text-2xl
          font-bold
          text-yellow-400
          mb-10
          "
        >
          ☀️ Umiya Admin
        </h1>

        <div className="space-y-3 flex-1">
          <button
            onClick={() => changeModule("dashboard")}
            className={`

            w-full
            text-left
            p-3
            rounded-lg


            ${
              activeModule === "dashboard"
                ? "bg-yellow-400 text-black font-bold"
                : "hover:bg-gray-700"
            }

            `}
          >
            📊 Dashboard
          </button>

          <button
            onClick={() => changeModule("create")}
            className={`

            w-full
            text-left
            p-3
            rounded-lg


            ${
              activeModule === "create"
                ? "bg-yellow-400 text-black font-bold"
                : "hover:bg-gray-700"
            }

            `}
          >
            👤 Create Employee
          </button>

          <button
            onClick={() => changeModule("data")}
            className={`

            w-full
            text-left
            p-3
            rounded-lg


            ${
              activeModule === "data"
                ? "bg-yellow-400 text-black font-bold"
                : "hover:bg-gray-700"
            }

            `}
          >
            📋 Data
          </button>
        </div>

        <button
          onClick={logout}
          className="
          w-full
          text-left
          p-3
          rounded-lg
          hover:bg-gray-700
          "
        >
          Logout
        </button>
      </aside>
    </>
  );
}
