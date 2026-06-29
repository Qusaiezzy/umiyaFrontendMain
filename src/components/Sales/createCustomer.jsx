import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function CreateCustomer() {
  const [rate, setRate] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    customerName: "",
    address: "",
    mobile: "",
    requirement: "",
    status: "confirmed",
    followUpDate: "",
  });

  useEffect(() => {
    api
      .get("/rate", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setRate(res.data.amount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const change = (e) => {
    setError("");
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      { key: "customerName", label: "Customer Name" },
      { key: "address", label: "Address" },
      { key: "mobile", label: "Mobile Number" },
      { key: "requirement", label: "Requirement" },
      { key: "status", label: "Status" },
    ];

    if (form.status === "enquiry") {
      requiredFields.push({ key: "followUpDate", label: "Follow Up Date" });
    }

    const emptyField = requiredFields.find(
      (field) => !String(form[field.key]).trim(),
    );

    if (emptyField) {
      setError(`${emptyField.label} is required`);
      return;
    }

    try {
      await api.post(
        "/customers/create",
        {
          ...form,
          rate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      alert("Customer Details Saved");
      setError("");

      setForm({
        customerName: "",
        address: "",
        mobile: "",
        requirement: "",
        status: "confirmed",
        followUpDate: "",
      });
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow">
        <h2 className="mb-5 text-2xl font-bold">Create Customer</h2>

        <form onSubmit={submit} className="space-y-4">
          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-600">
              {error}
            </p>
          )}

          <input
            name="customerName"
            value={form.customerName}
            placeholder="Customer Name"
            onChange={change}
            required
            className="input"
          />

          <input
            name="address"
            value={form.address}
            placeholder="Address"
            onChange={change}
            required
            className="input"
          />

          <input
            name="mobile"
            value={form.mobile}
            placeholder="Mobile Number"
            onChange={change}
            required
            className="input"
          />

          <textarea
            name="requirement"
            value={form.requirement}
            placeholder="Requirement"
            onChange={change}
            required
            className="input"
          />

          <input
            value={rate}
            disabled
            className="w-full cursor-not-allowed rounded-lg border bg-gray-200 p-3"
          />

          <select
            name="status"
            value={form.status}
            onChange={change}
            required
            className="input"
          >
            <option value="confirmed">Confirm</option>
            <option value="enquiry">Enquiry</option>
          </select>

          {form.status === "enquiry" && (
            <input
              type="date"
              name="followUpDate"
              value={form.followUpDate}
              onChange={change}
              required
              className="input"
            />
          )}

          <button className="w-full rounded-lg bg-yellow-400 p-3 font-bold">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
