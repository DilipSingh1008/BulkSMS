import React, { useState } from "react";
import { Plus, Trash2, Edit3 } from "lucide-react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useTheme } from "../../../context/ThemeContext.jsx";
import {
  useGetItemsQuery,
  useDeleteItemMutation,
  useUpdateItemMutation,
  useCreateItemMutation,
  usePatchItemMutation,
} from "../../../redux/api/apiSlice.js";
import Searchbar from "../../../components/Searchbar.jsx";

const ManageFlashBanner = () => {
  const { isDarkMode } = useTheme();

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

  // Table & search state
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const { data, isLoading } = useGetItemsQuery(
    `flash-banner?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}&search=${searchQuery}`,
  );

  const banners = data?.data || [];
  const totalPages = data?.totalPages || data?.pagination?.totalPages || 1;

  const [createItem] = useCreateItemMutation();
  const [deleteItem, { isLoading: deleteLoading }] = useDeleteItemMutation();
  const [updateItem] = useUpdateItemMutation();
  const [patchItem] = usePatchItemMutation();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isAddMode, setIsAddMode] = useState(true);

  // Sorting
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

  // Modal handlers
  const openAddModal = () => {
    setSelectedBanner({ title: "", url: "", buttonText: "", status: false });
    setIsAddMode(true);
    setIsModalOpen(true);
  };

  const openEditModal = (banner) => {
    setSelectedBanner(banner);
    setIsAddMode(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBanner(null);
    setIsModalOpen(false);
  };

  // Status toggle
  const handleStatusToggle = async (item) => {
    try {
      await patchItem({
        url: `flash-banner/status/${item._id}`,
        data: { status: !item.status },
      }).unwrap();
    } catch (err) {
      console.error("Status toggle error:", err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    try {
      await deleteItem(`flash-banner/${id}`).unwrap();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className={`h-screen w-full flex flex-col ${theme.main}`}>
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
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
              onClick={openAddModal}
              className="flex items-center cursor-pointer gap-1.5 px-3 py-1.5 bg-(--primary) text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-all"
            >
              <Plus size={16} /> Add New Banner
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
                    <th className="px-4 py-3">Photo</th>
                    <th
                      className="px-4 py-3 cursor-pointer hover:text-(--primary) transition-colors"
                      onClick={() => handleSort("title")}
                    >
                      Title <SortIcon field="title" />
                    </th>
                    <th
                      className="px-4 py-3 cursor-pointer hover:text-(--primary) transition-colors"
                      onClick={() => handleSort("url")}
                    >
                      URL <SortIcon field="url" />
                    </th>
                    <th
                      className="px-4 py-3 cursor-pointer hover:text-(--primary) transition-colors"
                      onClick={() => handleSort("buttonText")}
                    >
                      Button Text <SortIcon field="buttonText" />
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
                  ) : banners.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-10 text-center opacity-40"
                      >
                        No banners found.
                      </td>
                    </tr>
                  ) : (
                    banners.map((item, index) => (
                      <tr
                        key={item._id}
                        className="hover:bg-(--primary)/5 transition-colors cursor-pointer"
                        onClick={(e) => {
                          if (!e.target.closest("button")) openEditModal(item);
                        }}
                      >
                        <td className="px-4 py-2.5 font-mono opacity-50 text-[10px]">
                          {(page - 1) * limit + index + 1}
                        </td>
                        <td className="px-4 py-2.5">
                          <img
                            src={
                              item.photo
                                ? `http://localhost:5000/uploads/${item.photo}`
                                : "/placeholder.png"
                            }
                            alt={item.title}
                            className="w-20 h-12 object-cover rounded-md"
                          />
                        </td>
                        <td className="px-4 py-2.5 font-semibold">
                          {item.title}
                        </td>
                        <td className="px-4 py-2.5 text-blue-600 underline hover:text-blue-800">
                          <a href={item.url} target="_blank" rel="noreferrer">
                            {item.url}
                          </a>
                        </td>
                        <td className="px-4 py-2.5">{item.buttonText}</td>
                        <td className="px-4 py-2.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusToggle(item);
                            }}
                            className={`cursor-pointer w-8 h-4 rounded-full relative transition-colors ${
                              item.status ? "bg-(--primary)" : "bg-gray-400"
                            }`}
                          >
                            <div
                              className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${
                                item.status ? "left-4.5" : "left-0.5"
                              }`}
                            />
                          </button>
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditModal(item);
                              }}
                              className="p-1.5 cursor-pointer hover:text-(--primary) hover:bg-(--primary)/10 rounded-md transition-all"
                              title="Edit"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(item._id);
                              }}
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
                Showing {banners.length} entries
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

      {/* Add/Edit Modal */}
      {isModalOpen && selectedBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div
            className={`${theme.card} w-full max-w-md p-6 rounded-xl shadow-lg relative`}
          >
            <h2 className="text-lg font-semibold mb-4">
              {isAddMode ? "Add New Banner" : "Edit Banner"}
            </h2>
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium">Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setSelectedBanner({
                      ...selectedBanner,
                      photoFile: file,
                      photoPreview: URL.createObjectURL(file),
                    });
                  }
                }}
                className={`w-full px-3 py-2 rounded-md border ${
                  isDarkMode
                    ? "bg-[#1f2637] border-gray-700 text-white"
                    : "bg-white border-gray-300 text-gray-700"
                }`}
              />
              {selectedBanner.photoPreview || selectedBanner.photo ? (
                <img
                  src={
                    selectedBanner.photoPreview ||
                    `http://localhost:5000/uploads/${selectedBanner.photo}`
                  }
                  alt="Banner Preview"
                  className="w-40 h-20 object-cover rounded-md mt-1"
                />
              ) : null}

              <label className="text-sm font-medium">Title</label>
              <input
                type="text"
                className={`w-full px-3 py-2 rounded-md border ${
                  isDarkMode
                    ? "bg-[#1f2637] border-gray-700 text-white"
                    : "bg-white border-gray-300 text-gray-700"
                }`}
                value={selectedBanner.title}
                onChange={(e) =>
                  setSelectedBanner({
                    ...selectedBanner,
                    title: e.target.value,
                  })
                }
              />

              <label className="text-sm font-medium">URL</label>
              <input
                type="text"
                className={`w-full px-3 py-2 rounded-md border ${
                  isDarkMode
                    ? "bg-[#1f2637] border-gray-700 text-white"
                    : "bg-white border-gray-300 text-gray-700"
                }`}
                value={selectedBanner.url}
                onChange={(e) =>
                  setSelectedBanner({ ...selectedBanner, url: e.target.value })
                }
              />

              <label className="text-sm font-medium">Button Text</label>
              <input
                type="text"
                className={`w-full px-3 py-2 rounded-md border ${
                  isDarkMode
                    ? "bg-[#1f2637] border-gray-700 text-white"
                    : "bg-white border-gray-300 text-gray-700"
                }`}
                value={selectedBanner.buttonText}
                onChange={(e) =>
                  setSelectedBanner({
                    ...selectedBanner,
                    buttonText: e.target.value,
                  })
                }
              />

              <button
                onClick={async () => {
                  try {
                    const formData = new FormData();
                    formData.append("title", selectedBanner.title);
                    formData.append("url", selectedBanner.url);
                    formData.append("buttonText", selectedBanner.buttonText);
                    formData.append("status", selectedBanner.status);

                    if (selectedBanner.photoFile)
                      formData.append("photo", selectedBanner.photoFile);

                    if (isAddMode) {
                      await createItem({
                        url: "flash-banner",
                        data: formData,
                      }).unwrap();
                    } else {
                      await updateItem({
                        url: `flash-banner/${selectedBanner._id}`,
                        data: formData,
                      }).unwrap();
                    }

                    closeModal();
                  } catch (err) {
                    console.error("Error saving banner:", err);
                  }
                }}
                className="mt-4 px-4 py-2 bg-(--primary) text-white rounded-md hover:opacity-90 transition-all"
              >
                {isAddMode ? "Add Banner" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFlashBanner;
