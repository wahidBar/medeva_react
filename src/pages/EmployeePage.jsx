// pages/EmployeePage.jsx
import { useState } from "react";
import EmployeeDetail from "../components/EmployeeDetail";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

const EmployeePage = () => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [view, setView] = useState("none");
    const [refreshKey, setRefreshKey] = useState(0); // ← trigger fetch ulang

    const handleAddNew = () => {
        setSelectedEmployee(null);
        setView("create");
    };

    const handleSelectEdit = (employee) => {
        setSelectedEmployee(employee);
        setView("edit");
    };

    const handleSelectDetail = (employee) => {
        setSelectedEmployee(employee);
        setView("detail");
    };

    const handleSuccess = (employee) => {
        setRefreshKey((prev) => prev + 1); // ← trigger ulang list
        setSelectedEmployee(employee);
        setView("detail");
    };

    const handleCancel = () => {
        setSelectedEmployee(null);
        setView("none");
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <EmployeeList
                key={refreshKey} // ← pakai key agar reset
                onAddNew={handleAddNew}
                onSelectEdit={handleSelectEdit}
                onSelectDetail={handleSelectDetail}
            />

            <div className="bg-white shadow-md rounded-lg p-4">
                {view === "create" && (
                    <EmployeeForm onSuccess={handleSuccess} onCancel={handleCancel} />
                )}
                {view === "edit" && selectedEmployee && (
                    <EmployeeForm
                        employee={selectedEmployee}
                        onSuccess={handleSuccess}
                        onCancel={handleCancel}
                    />
                )}
                {view === "detail" && selectedEmployee && (
                    <EmployeeDetail employee={selectedEmployee} onClose={handleCancel} />
                )}
                {view === "none" && (
                    <div className="text-gray-400 text-center pt-16">
                        Pilih data karyawan untuk melihat detail atau tambah data baru
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeePage;
