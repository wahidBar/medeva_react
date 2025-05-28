import { FiBarChart2, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <aside className="w-64 bg-white border-r p-4">
            <h2 className="text-lg font-semibold mb-6">Dashboard</h2>
            <nav className="flex flex-col gap-4">
                <Link to="/" className="flex items-center gap-2">
                    <FiBarChart2 /> Dashboard
                </Link>
                <Link to="/employees" className="flex items-center gap-2">
                    <FiUser /> Karyawan
                </Link>
                <button onClick={logout} className="text-sm text-red-500 mt-auto">Logout</button>
            </nav>
        </aside>
    );
};

export default Sidebar;