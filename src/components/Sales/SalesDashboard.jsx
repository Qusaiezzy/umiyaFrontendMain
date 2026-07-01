import CreateCustomer from "./CreateCustomer";
import CustomerList from "./CustomerList";
import { useNavigate } from "react-router-dom";

export default function SalesDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name || "User";

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className="
        min-h-screen
        bg-gray-100
        p-5
        "
    >
      <div
        className="
            mb-5
            flex
            items-center
            justify-between
            gap-4
            "
      >
        <h1
          className="
                text-2xl
                font-bold
                text-gray-800
                "
        >
          Sales Dashboard
        </h1>

        <p
          className="
                text-sm
                font-semibold
                text-gray-600
                "
        >
          Welcome, {userName}
        </p>

        <button
          onClick={logout}
          className="
                    cursor-pointer
                    rounded-lg
                    bg-gray-900
                    px-4
                    py-2
                    font-semibold
                    text-white
                    transition
                    hover:bg-gray-700
                    "
        >
          Logout
        </button>
      </div>

      <div
        className="
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-5
            "
      >
        {/* Create Customer Section */}

        <div
          className="
                lg:col-span-1
                "
        >
          <CreateCustomer />
        </div>

        {/* Customer List Section */}

        <div
          className="
                lg:col-span-2
                "
        >
          <CustomerList />
        </div>
      </div>
    </div>
  );
}
