import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function EditCustomerModal({ customer, close, onSave }) {
  const [form, setForm] = useState({
    documentsReceived: "",
    correctionRequired: "",
    paymentType: "",
    loanOptions: [],
    cashOption: "",
    bankPayment1: "",
    installation: "",
    metering: "",
    payment2: "",
    payment3: "",
    subsidy: ""
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (customer) {
      setForm({
        documentsReceived: customer.documentsReceived || "",
        correctionRequired: customer.correctionRequired || "",
        paymentType: customer.paymentType || "",
        loanOptions: customer.loanOptions || [],
        cashOption: customer.cashOption || "",
        bankPayment1: customer.bankPayment1 || "",
        installation: customer.installation || "",
        metering: customer.metering || "",
        payment2: customer.payment2 || "",
        payment3: customer.payment3 || "",
        subsidy: customer.subsidy || ""
      });
    }
  }, [customer]);

  const handleLoan = (e) => {
    const value = e.target.value;
    const next = e.target.checked
      ? [...form.loanOptions, value]
      : form.loanOptions.filter((item) => item !== value);

    setForm((prev) => ({ ...prev, loanOptions: next }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customer?._id) {
      return;
    }

    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      const res = await api.put(
        `/customers/${customer._id}/progress`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (onSave) {
        onSave(res.data.customer);
      }
      close();
    } catch (err) {
      console.log("Update customer progress error", err);
      alert("Unable to save customer progress right now.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-4 shadow sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">Update Customer Progress</h2>
            <p className="text-sm font-semibold text-gray-600">{customer?.customerName}</p>
          </div>
          <button
            type="button"
            onClick={close}
            className="rounded-full bg-gray-100 px-3 py-1 text-lg"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block font-semibold">Documents Received</label>
              <select
                className="input w-full"
                value={form.documentsReceived}
                onChange={(e) => setForm((prev) => ({ ...prev, documentsReceived: e.target.value }))}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {form.documentsReceived === "yes" && (
              <div>
                <label className="mb-1 block font-semibold">Correction Required</label>
                <select
                  className="input w-full"
                  value={form.correctionRequired}
                  onChange={(e) => setForm((prev) => ({ ...prev, correctionRequired: e.target.value }))}
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            )}
          </div>

          {form.documentsReceived === "yes" && form.correctionRequired === "no" && (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block font-semibold">Payment Type</label>
                <select
                  className="input w-full"
                  value={form.paymentType}
                  onChange={(e) => setForm((prev) => ({ ...prev, paymentType: e.target.value }))}
                >
                  <option value="">Select</option>
                  <option value="loan">Loan</option>
                  <option value="cash">Cash</option>
                </select>
              </div>

              {form.paymentType === "cash" && (
                <div>
                  <label className="mb-1 block font-semibold">Cash Option</label>
                  <select
                    className="input w-full"
                    value={form.cashOption}
                    onChange={(e) => setForm((prev) => ({ ...prev, cashOption: e.target.value }))}
                  >
                    <option value="">Select</option>
                    <option value="P.M surya">P.M surya</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {form.paymentType === "loan" && (
            <div className="rounded-lg border border-gray-200 p-3">
              <p className="mb-2 font-semibold">Loan Options</p>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-5">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="Loaning Registration"
                    checked={form.loanOptions.includes("Loaning Registration")}
                    onChange={handleLoan}
                  />
                  Loaning Registration
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="P.M vibhajaye"
                    checked={form.loanOptions.includes("P.M vibhajaye")}
                    onChange={handleLoan}
                  />
                  P.M vibhajaye
                </label>
              </div>
            </div>
          )}

          {form.paymentType && (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block font-semibold">Bank Payment 1</label>
                <select
                  className="input w-full"
                  value={form.bankPayment1}
                  onChange={(e) => setForm((prev) => ({ ...prev, bankPayment1: e.target.value }))}
                >
                  <option value="">Select</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>
          )}

          {form.bankPayment1 === "done" && (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block font-semibold">Installation</label>
                <select
                  className="input w-full"
                  value={form.installation}
                  onChange={(e) => setForm((prev) => ({ ...prev, installation: e.target.value }))}
                >
                  <option value="">Select</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>
          )}

          {form.installation === "done" && (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block font-semibold">Metering</label>
                <select
                  className="input w-full"
                  value={form.metering}
                  onChange={(e) => setForm((prev) => ({ ...prev, metering: e.target.value }))}
                >
                  <option value="">Select</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>
          )}

          {form.metering === "done" && (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block font-semibold">Payment 2</label>
                <select
                  className="input w-full"
                  value={form.payment2}
                  onChange={(e) => setForm((prev) => ({ ...prev, payment2: e.target.value }))}
                >
                  <option value="">Select</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block font-semibold">Payment 3</label>
                <select
                  className="input w-full"
                  value={form.payment3}
                  onChange={(e) => setForm((prev) => ({ ...prev, payment3: e.target.value }))}
                >
                  <option value="">Select</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>
          )}

          {form.payment2 === "done" && (
            <div>
              <label className="mb-1 block font-semibold">Subsidy</label>
              <select
                className="input w-full"
                value={form.subsidy}
                onChange={(e) => setForm((prev) => ({ ...prev, subsidy: e.target.value }))}
              >
                <option value="">Select</option>
                <option value="done">Done</option>
              </select>
            </div>
          )}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={close}
              className="rounded bg-gray-300 px-5 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded bg-yellow-400 px-5 py-2 font-bold"
            >
              {saving ? "Saving..." : "Save Details"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
