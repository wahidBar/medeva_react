// components/EmployeeList.jsx
import { useEffect, useState } from "react";
import { FaArrowRight, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { deleteEmployee, getEmployees } from "../api/employeeApi";

const EmployeeList = ({ onSelectDetail, onSelectEdit, onAddNew }) => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchData = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error("Gagal fetch data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Yakin hapus karyawan ini?")) {
      await deleteEmployee(id);
      fetchData();
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const nameMatch = emp.full_name.toLowerCase().includes(search.toLowerCase());
    const statusMatch = filter === "all" || emp.status === filter;
    return nameMatch && statusMatch;
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <p className="font-bold text-lg">DATA KARYAWAN & TENAGA KESEHATAN</p>
        <button
          onClick={onAddNew}
          className="flex items-center gap-2 bg-blue-600 text-white text-sm px-3 py-1 rounded"
        >
          <FaPlus /> Tambah Karyawan
        </button>
      </div>

      <div className="flex items-center border rounded px-2 mb-4">
        <input
          type="text"
          placeholder="Pencarian nama..."
          className="outline-none py-1 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="text-gray-500 ml-2" />
      </div>

      <div className="flex items-center space-x-2 mb-4">
        {["all", "Active", "Non-Active"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 border rounded ${filter === status ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="divide-y">
        {filteredEmployees.map((emp, idx) => (
          <div key={emp.id} className="flex justify-between items-center py-3 hover:bg-gray-50 rounded transition">
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => onSelectDetail(emp)}
            >
              <img
                src={`http://localhost:5000/uploads/${emp.photo || "default.jpg"}`}
                alt={emp.full_name}
                className="w-12 h-12 object-cover rounded-full border"
              />
              <div>
                <div>
                  <p className="font-medium">
                    {idx + 1}. {emp.full_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {emp.roles?.length > 0
                      ? emp.roles.map((r) => r.name).join(", ")
                      : "-"}
                  </p>
                </div>
                <span className={`inline-block text-xs mt-1 px-2 py-0.5 rounded ${emp.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                  {emp.status}
                </span>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <button
                onClick={() => onSelectEdit(emp)}
                className="text-blue-600 hover:text-blue-800"
              >
                <FaArrowRight />
              </button>
              <button
                onClick={() => handleDelete(emp.id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
