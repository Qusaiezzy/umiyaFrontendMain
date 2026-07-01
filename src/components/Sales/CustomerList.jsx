import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function CustomerList() {
  const [data, setData] = useState([]);

  const getCustomers = () => {
    api
      .get("/customers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("Customer List:", res.data);
        setData(Array.isArray(res.data) ? res.data : res.data.customers || []);
      })
      .catch((err) => {
        console.log(err);
        setData([]);
      });
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const updateToConfirmed = async (customer) => {
    if (customer.status === "confirmed") {
      alert("Confirmed status cannot be edited");
      return;
    }

    const shouldUpdate = window.confirm(
      "Are you sure you want to update this enquiry to confirmed?",
    );

    if (!shouldUpdate) {
      return;
    }

    try {
      const res = await api.put(
        `/customers/${customer._id}/confirm`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setData((customers) =>
        customers.map((item) =>
          item._id === customer._id ? res.data.customer : item,
        ),
      );

      alert("Customer updated to confirmed");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update customer status");
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl bg-white p-4 shadow">
      <h2 className="mb-4 text-xl font-bold">My Customers</h2>

      <table className="min-w-full text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Mobile</th>
            <th className="p-3 text-left">Requirement</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date of Contact</th>
            <th className="p-3 text-left">Rate</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="8" className="p-5 text-center">
                No Customers Found
              </td>
            </tr>
          ) : (
            data.map((c) => (
              <tr key={c._id} className="border-b">
                <td className="p-3">{c.customerName}</td>
                <td className="p-3">{c.address}</td>
                <td className="p-3">{c.mobile}</td>
                <td className="p-3">{c.requirement}</td>
                <td className="p-3 capitalize">{c.status}</td>
                <td className="p-3">
                  {c.followUpDate
                    ? new Date(c.followUpDate)
                        .toLocaleDateString("en-GB")
                        .replaceAll("/", "-")
                    : "-"}
                </td>
                <td className="p-3">₹{c.rate}</td>
                <td className="p-3">
                  <button
                    onClick={() => updateToConfirmed(c)}
                    className="rounded-lg bg-yellow-400 px-4 py-2 font-bold transition hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
