import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ setActive }) {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();

    navigate("/login"); 
  };


  return (
    <>

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


      <aside
        className={`
        fixed
        md:relative
        top-0
        left-0
        h-screen
        w-64
        bg-gray-900
        text-white
        p-6
        z-40
        transition-transform
        ${
          open
          ? "translate-x-0"
          : "-translate-x-full"
        }
        md:translate-x-0
        `}
      >


        <h1 className="
        text-2xl
        font-bold
        text-yellow-400
        mb-10
        ">
          ☀️ Umiya Admin
        </h1>


        <div className="space-y-3">


          <button
            onClick={() => setActive("dashboard")}
            className="
            w-full
            text-left
            p-3
            rounded-lg
            hover:bg-gray-700
            transition
            "
          >
            📊 Dashboard
          </button>



          <button
            onClick={() => setActive("create")}
            className="
            w-full
            text-left
            p-3
            rounded-lg
            hover:bg-gray-700
            transition
            "
          >
            👤 Create Employee
          </button>



          <button
            onClick={() => setActive("data")}
            className="
            w-full
            text-left
            p-3
            rounded-lg
            hover:bg-gray-700
            transition
            "
          >
            📋 Data
          </button>



          <button
            onClick={logout}
            className="
            w-full
            text-left
            p-3
            rounded-lg
            hover:bg-gray-700
            transition
            "
          >
            Logout
          </button>


        </div>


      </aside>

    </>
  );
}
