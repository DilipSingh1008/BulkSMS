import React, { useState } from "react";
import { Plus, Trash2, Edit3 } from "lucide-react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useTheme } from "../../../context/ThemeContext";
import {
  useGetItemsQuery,
  useDeleteItemMutation,
  useUpdateItemMutation,
  usePatchItemMutation,
} from "../../../redux/api/apiSlice.js";
import Searchbar from "../../../components/Searchbar";
import { useNavigate } from "react-router-dom";

const ManagePricing = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [patchItem] = usePatchItemMutation();

  const theme = {
    main: isDarkMode
      ? "bg-[#0b0e14] text-slate-300"
      : "bg-gray-50 text-gray-700",
    card: isDarkMode
      ? "bg-[#151b28] border border-gray-800 text-white"
      : "bg-white border border-gray-200 text-gray-700",
    header: isDarkMode
      ? "bg-[#1f2637] text-gray-400"
      : "bg-gray-100 text-gray-500",
    divider: isDarkMode ? "divide-gray-800" : "divide-gray-100",
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  // Fetch pricing plans
  const { data, isLoading } = useGetItemsQuery(
    `pricing?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}&search=${searchQuery}`,
  );

  const pricingPlans = data?.data || [];
  const totalPages = data?.totalPages || data?.pagination?.totalPages || 1;

  const [deleteItem, { isLoading: deleteLoading }] = useDeleteItemMutation();
  const [updateItem] = useUpdateItemMutation();

  const handleSort = (field) => {
    const isAsc = sortBy === field && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setSortBy(field);
    setPage(1);
  };

  const SortIcon = ({ field }) => (
    <span className="opacity-50 text-[10px]">
      {sortBy === field ? (order === "asc" ? "▲" : "▼") : "↕"}
    </span>
  );

  const handleStatusToggle = async (plan) => {
    // await updateItem({
    //   url: `pricing/status/${plan._id}`,
    //   data: { status: !plan.status },
    // });
    await patchItem({ url: `pricing/status/${plan._id}`, data: {} });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pricing plan?"))
      return;
    await deleteItem(`pricing/${id}`);
  };

  return (
    <div className={`h-screen w-full flex flex-col ${theme.main}`}>
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-4 gap-2">
            <div className="flex-1 min-w-[150px]">
              <Searchbar
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <button
              onClick={() => navigate("/dashboard/ManagePricing/add")}
              className="flex items-center cursor-pointer gap-1.5 px-3 py-1.5 bg-(--primary) text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-all"
            >
              <Plus size={16} /> Add New Plan
            </button>
          </div>

          {/* Table */}
          <div className={`${theme.card} rounded-xl overflow-hidden shadow-sm`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[600px] md:min-w-full">
                <thead
                  className={`uppercase tracking-wider font-bold ${theme.header}`}
                >
                  <tr>
                    <th className="px-4 py-3 w-10">ID</th>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      Name <SortIcon field="name" />
                    </th>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort("price")}
                    >
                      Price <SortIcon field="price" />
                    </th>
                    <th
                      className="px-4 py-3 hidden md:table-cell cursor-pointer"
                      onClick={() => handleSort("desc")}
                    >
                      Description <SortIcon field="desc" />
                    </th>
                    <th className="px-4 py-3 w-16">Status</th>
                    <th className="px-4 py-3 text-right w-24">Action</th>
                  </tr>
                </thead>

                <tbody className={`divide-y ${theme.divider}`}>
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-10 text-center opacity-40 italic"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : pricingPlans.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-10 text-center opacity-40"
                      >
                        No pricing plans found.
                      </td>
                    </tr>
                  ) : (
                    pricingPlans.map((plan, index) => (
                      <tr
                        key={plan._id}
                        className="hover:bg-(--primary)/5 transition-colors"
                      >
                        <td className="px-4 py-2.5 font-mono opacity-50 text-[10px]">
                          {(page - 1) * limit + index + 1}
                        </td>
                        <td className="px-4 py-2.5 font-semibold">
                          {plan.name}
                        </td>
                        <td className="px-4 py-2.5">{plan.price}</td>
                        <td className="px-4 py-2.5 hidden md:table-cell">
                          {plan.desc}
                        </td>
                        <td className="px-4 py-2.5">
                          <button
                            onClick={() => handleStatusToggle(plan)}
                            className={`cursor-pointer w-8 h-4 rounded-full relative transition-colors ${
                              plan.status ? "bg-(--primary)" : "bg-gray-400"
                            }`}
                          >
                            <div
                              className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${
                                plan.status ? "left-4.5" : "left-0.5"
                              }`}
                            />
                          </button>
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() =>
                                navigate(
                                  `/dashboard/ManagePricing/edit/${plan._id}`,
                                )
                              }
                              className="p-1.5 cursor-pointer hover:text-(--primary) hover:bg-(--primary)/10 rounded-md transition-all"
                              title="Edit"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(plan._id)}
                              className="p-1.5 cursor-pointer hover:text-red-500 hover:bg-red-500/10 rounded-md transition-all disabled:opacity-30"
                              title="Delete"
                              disabled={deleteLoading}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-between p-3 border-t ${theme.divider} gap-2 sm:gap-0`}
            >
              <span className="text-[11px] opacity-60">
                Showing {pricingPlans.length} entries
              </span>
              <div className="flex items-center gap-1 flex-wrap sm:flex-nowrap">
                <button
                  disabled={page === 1 || isLoading}
                  onClick={() => setPage(page - 1)}
                  className="p-1.5 border rounded-md disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:border-(--primary) hover:text-(--primary) transition-colors"
                >
                  <FiChevronLeft size={16} />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`w-7 h-7 text-[11px] rounded-md border transition-all cursor-pointer ${
                      page === i + 1
                        ? "bg-(--primary) text-white border-(--primary) shadow-sm"
                        : "hover:border-(--primary) hover:text-(--primary) border-transparent"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={page === totalPages || isLoading}
                  onClick={() => setPage(page + 1)}
                  className="p-1.5 border rounded-md disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:border-(--primary) hover:text-(--primary) transition-colors"
                >
                  <FiChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManagePricing;
