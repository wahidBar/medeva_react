import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <p className="text-lg font-medium">Jumlah Karyawan</p>
                        <p className="text-2xl font-bold">42</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-lg font-medium">Aktif</p>
                        <p className="text-2xl font-bold">35</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-lg font-medium">Kontrak Berakhir</p>
                        <p className="text-2xl font-bold">7</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
