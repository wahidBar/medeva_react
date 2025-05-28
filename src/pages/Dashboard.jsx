import { useEffect, useState } from "react";
import { getEmployees } from "../api/employeeApi";
import { Card, CardContent } from "../components/ui/Card";

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEmployees();
                setEmployees(data);
            } catch (error) {
                console.error("Gagal memuat data:", error);
            }
        };

        fetchData();
    }, []);

    const total = employees.length;
    const aktif = employees.filter((e) => e.status === "Active").length;
    const expired = employees.filter((e) => {
        if (!e.contract_end) return false;
        const end = new Date(e.contract_end);
        const now = new Date();
        return end <= now;
    }).length;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <p className="text-lg font-medium">Jumlah Karyawan</p>
                        <p className="text-2xl font-bold">{total}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-lg font-medium">Aktif</p>
                        <p className="text-2xl font-bold">{aktif}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-lg font-medium">Kontrak Berakhir</p>
                        <p className="text-2xl font-bold">{expired}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
