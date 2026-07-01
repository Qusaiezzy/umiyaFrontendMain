import { useCallback, useEffect, useState } from "react";
import api from "../../api/axios";
import EditCustomerModal from "./EditCustomerModal";

export default function UserData() {
    const [customers, setCustomers] = useState([]);
    const [sales, setSales] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [salesPerson, setSalesPerson] = useState("");
    const [documentsReceived, setDocumentsReceived] = useState("");
    const [correctionRequired, setCorrectionRequired] = useState("");
    const [paymentTypeFilter, setPaymentTypeFilter] = useState("");
    const [installationFilter, setInstallationFilter] = useState("");
    const [meteringFilter, setMeteringFilter] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const getCustomers = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            const params = new URLSearchParams({
                page: String(page),
                limit: "10",
                search,
                status,
                salesPerson,
                documentsReceived,
                correctionRequired,
                paymentType: paymentTypeFilter,
                installation: installationFilter,
                metering: meteringFilter
            });

            const res = await api.get(`/customers?${params.toString()}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setCustomers(res.data.customers || []);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            console.log("Customer Fetch Error:", err);
            setCustomers([]);
        }
    }, [page, status, salesPerson, search, documentsReceived, correctionRequired, paymentTypeFilter, installationFilter, meteringFilter]);

    const getSalesUsers = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await api.get("/users/sales", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (Array.isArray(res.data)) {
                setSales(res.data);
            } else if (res.data.users) {
                setSales(res.data.users);
            } else {
                setSales([]);
            }
        } catch (err) {
            console.log("Sales API Error", err);
            setSales([]);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getCustomers();
    }, [getCustomers]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getSalesUsers();
    }, [getSalesUsers]);

    const editCustomer = (customer) => {
        setSelectedCustomer(customer);
        setShowModal(true);
    };

    const deleteCustomer = async (customer) => {
        const confirmed = window.confirm(`Delete ${customer.customerName}'s data?`);

        if (!confirmed) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await api.delete(`/customers/${customer._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            getCustomers();
        } catch (err) {
            console.log("Customer Delete Error:", err);
            alert(err.response?.data?.message || "Unable to delete customer");
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCustomer(null);
    };

    const renderStatusTag = (value) => {
        if (!value) {
            return <span className="text-gray-400">-</span>;
        }

        const isDone = value === "yes" || value === "done";
        return (
            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${isDone ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {isDone ? "✓" : "✕"}
            </span>
        );
    };

    return (
        <div>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-3xl font-bold">Customer Data</h1>

                <button
                    onClick={() => setShowFilters((value) => !value)}
                    className="w-full rounded-lg bg-gray-900 px-5 py-3 font-semibold text-white transition hover:bg-gray-700 sm:w-auto"
                >
                    {showFilters ? "Hide Filters" : "Filter"}
                </button>
            </div>

            {showFilters && (
            <div className="mb-5 grid grid-cols-1 gap-4 rounded-xl bg-white p-4 shadow sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div>
                    <label htmlFor="customer-search" className="mb-1 block text-sm font-semibold text-gray-700">
                        Search Customer
                    </label>
                    <input
                        id="customer-search"
                        placeholder="Search by name or mobile number"
                        value={search}
                        onChange={(e) => {
                            setPage(1);
                            setSearch(e.target.value);
                        }}
                        className="input"
                    />
                </div>

                <div>
                    <label htmlFor="status-filter" className="mb-1 block text-sm font-semibold text-gray-700">
                        Status
                    </label>
                    <select
                        id="status-filter"
                        value={status}
                        onChange={(e) => {
                            setPage(1);
                            setStatus(e.target.value);
                        }}
                        className="input"
                    >
                        <option value="">All Status</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="enquiry">Enquiry</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="sales-person-filter" className="mb-1 block text-sm font-semibold text-gray-700">
                        Sales Person
                    </label>
                    <select
                        id="sales-person-filter"
                        value={salesPerson}
                        onChange={(e) => {
                            setPage(1);
                            setSalesPerson(e.target.value);
                        }}
                        className="input"
                    >
                        <option value="">All Sales Person</option>
                        {sales?.map((s) => (
                            <option key={s._id} value={s._id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="documents-filter" className="mb-1 block text-sm font-semibold text-gray-700">
                        Documents Received
                    </label>
                    <select
                        id="documents-filter"
                        value={documentsReceived}
                        onChange={(e) => {
                            setPage(1);
                            setDocumentsReceived(e.target.value);
                        }}
                        className="input"
                    >
                        <option value="">All</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="correction-filter" className="mb-1 block text-sm font-semibold text-gray-700">
                        Correction Required
                    </label>
                    <select
                        id="correction-filter"
                        value={correctionRequired}
                        onChange={(e) => {
                            setPage(1);
                            setCorrectionRequired(e.target.value);
                        }}
                        className="input"
                    >
                        <option value="">All</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="payment-type-filter" className="mb-1 block text-sm font-semibold text-gray-700">
                        Payment Type
                    </label>
                    <select
                        id="payment-type-filter"
                        value={paymentTypeFilter}
                        onChange={(e) => {
                            setPage(1);
                            setPaymentTypeFilter(e.target.value);
                        }}
                        className="input"
                    >
                        <option value="">All</option>
                        <option value="loan">Loan</option>
                        <option value="cash">Cash</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="installation-filter" className="mb-1 block text-sm font-semibold text-gray-700">
                        Installation
                    </label>
                    <select
                        id="installation-filter"
                        value={installationFilter}
                        onChange={(e) => {
                            setPage(1);
                            setInstallationFilter(e.target.value);
                        }}
                        className="input"
                    >
                        <option value="">All</option>
                        <option value="done">Done</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="metering-filter" className="mb-1 block text-sm font-semibold text-gray-700">
                        Metering
                    </label>
                    <select
                        id="metering-filter"
                        value={meteringFilter}
                        onChange={(e) => {
                            setPage(1);
                            setMeteringFilter(e.target.value);
                        }}
                        className="input"
                    >
                        <option value="">All</option>
                        <option value="done">Done</option>
                    </select>
                </div>
            </div>
            )}

            <div className="overflow-x-auto rounded-xl bg-white shadow">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="whitespace-nowrap p-4 text-left">Name</th>
                            <th className="whitespace-nowrap p-4 text-left">Mobile</th>
                            <th className="min-w-[220px] p-4 text-left">Address</th>
                            <th className="min-w-[160px] p-4 text-left">Requirement</th>
                            <th className="whitespace-nowrap p-4 text-left">Rate</th>
                            <th className="whitespace-nowrap p-4 text-left">Status</th>
                            <th className="whitespace-nowrap p-4 text-left">Sales</th>
                            <th className="whitespace-nowrap p-4 text-left">Docs</th>
                            <th className="whitespace-nowrap p-4 text-left">Correction</th>
                            <th className="whitespace-nowrap p-4 text-left">Payment</th>
                            <th className="whitespace-nowrap p-4 text-left">Bank Pay</th>
                            <th className="whitespace-nowrap p-4 text-left">Install</th>
                            <th className="whitespace-nowrap p-4 text-left">Meter</th>
                            <th className="whitespace-nowrap p-4 text-left">Pay 2</th>
                            <th className="whitespace-nowrap p-4 text-left">Pay 3</th>
                            <th className="whitespace-nowrap p-4 text-left">Subsidy</th>
                            <th className="whitespace-nowrap p-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((c) => (
                            <tr key={c._id} className="border-b">
                                <td className="whitespace-nowrap p-4">{c.customerName}</td>
                                <td className="whitespace-nowrap p-4">{c.mobile}</td>
                                <td className="min-w-[220px] p-4">{c.address}</td>
                                <td className="min-w-[160px] p-4">{c.requirement}</td>
                                <td className="whitespace-nowrap p-4">₹{c.rate}</td>
                                <td className="whitespace-nowrap p-4">{c.status}</td>
                                <td className="whitespace-nowrap p-4">{c.createdBy?.name}</td>
                                <td className="whitespace-nowrap p-4">{renderStatusTag(c.documentsReceived)}</td>
                                <td className="whitespace-nowrap p-4">{renderStatusTag(c.correctionRequired)}</td>
                                <td className="whitespace-nowrap p-4">{c.paymentType ? (c.paymentType === "loan" ? "Loan" : "Cash") : "-"}</td>
                                <td className="whitespace-nowrap p-4">{renderStatusTag(c.bankPayment1)}</td>
                                <td className="whitespace-nowrap p-4">{renderStatusTag(c.installation)}</td>
                                <td className="whitespace-nowrap p-4">{renderStatusTag(c.metering)}</td>
                                <td className="whitespace-nowrap p-4">{renderStatusTag(c.payment2)}</td>
                                <td className="whitespace-nowrap p-4">{renderStatusTag(c.payment3)}</td>
                                <td className="whitespace-nowrap p-4">{renderStatusTag(c.subsidy)}</td>
                                <td className="whitespace-nowrap p-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => editCustomer(c)}
                                            className="rounded bg-blue-500 px-4 py-2 text-white"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteCustomer(c)}
                                            className="rounded bg-red-500 px-4 py-2 text-white"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-5 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="rounded bg-gray-200 px-4 py-2"
                >
                    Previous
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="rounded bg-yellow-400 px-4 py-2"
                >
                    Next
                </button>
            </div>

            {showModal && (
                <EditCustomerModal
                    customer={selectedCustomer}
                    close={closeModal}
                    onSave={() => getCustomers()}
                />
            )}
        </div>
    );
}
