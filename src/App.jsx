import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import SalesDashboard from "./components/Sales/SalesDashboard";

import ProtectedRoute from "./auth/ProtectedRoute";


export default function App() {


  return (

    <BrowserRouter>

      <Routes>


        {/* Default route */}
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />



        {/* Login */}
        <Route

          path="/login"

          element={<Login />}

        />



        {/* Admin */}
        <Route

          path="/admin"

          element={

            <ProtectedRoute role="admin">

              <AdminDashboard />

            </ProtectedRoute>

          }

        />



        {/* Sales */}
        <Route

          path="/sales"

          element={

            <ProtectedRoute role="sales">

              <SalesDashboard />

            </ProtectedRoute>

          }

        />


      </Routes>


    </BrowserRouter>

  )

}