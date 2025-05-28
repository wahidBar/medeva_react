import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import EmployeePage from "../pages/EmployeePage";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-4 overflow-auto">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/employees" element={<EmployeePage />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default Layout;