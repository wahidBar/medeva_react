
const EmployeeDetail = ({ employee, onClose }) => {
    if (!employee) return null;

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <img
                    src={`http://localhost:5000/uploads/${employee.photo || "default.jpg"}`}
                    alt={employee.full_name}
                    className="w-20 h-20 rounded-full border object-cover"
                />
                <div>
                    <div>
                        <p className="font-medium">
                            {employee.full_name}
                        </p>
                        <p className="text-sm text-gray-500">
                            {employee.roles?.length > 0
                                ? employee.roles.map((r) => r.name).join(", ")
                                : "-"}
                        </p>
                    </div>

                    <span
                        className={`inline-block mt-1 text-xs font-medium px-2 py-1 rounded-full ${employee.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                    >
                        {employee.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="font-medium">Username</p>
                    <p className="text-gray-700">{employee.username || "-"}</p>
                </div>
                <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-700">{employee.email || "-"}</p>
                </div>
                <div>
                    <p className="font-medium">No. Telepon</p>
                    <p className="text-gray-700">{employee.phone || "-"}</p>
                </div>
                <div>
                    <p className="font-medium">Jenis Kelamin</p>
                    <p className="text-gray-700">{employee.gender || "-"}</p>
                </div>
                <div>
                    <p className="font-medium">Tempat, Tanggal Lahir</p>
                    <p className="text-gray-700">
                        {employee.birth_place || "-"},{" "}
                        {employee.birth_date
                            ? new Date(employee.birth_date).toLocaleDateString("id-ID")
                            : "-"}
                    </p>
                </div>
                <div>
                    <p className="font-medium">Status Menikah</p>
                    <p className="text-gray-700">{employee.marital_status || "-"}</p>
                </div>
                <div className="col-span-2">
                    <p className="font-medium">Alamat</p>
                    <p className="text-gray-700">
                        {[
                            employee.address,
                            employee.village,
                            employee.district,
                            employee.city,
                            employee.province,
                        ]
                            .filter(Boolean)
                            .join(", ") || "-"}
                    </p>
                </div>
                <div className="col-span-2">
                    <p className="font-medium">Kode Dokter BPJS</p>
                    <p className="text-gray-700">{employee.bpjs_code || "-"}</p>
                </div>
                <div className="col-span-2">
                    <p className="font-medium">Tipe / Peran</p>
                    <p className="text-sm text-gray-500">
                        {employee.roles?.length > 0
                            ? employee.roles.map((r) => r.name).join(", ")
                            : "-"}
                    </p>
                </div>
                <div>
                    <p className="font-medium">Mulai Kontrak</p>
                    <p className="text-gray-700">
                        {employee.contract_start
                            ? new Date(employee.contract_start).toLocaleDateString("id-ID")
                            : "-"}
                    </p>
                </div>
                <div>
                    <p className="font-medium">Selesai Kontrak</p>
                    <p className="text-gray-700">
                        {employee.contract_end
                            ? new Date(employee.contract_end).toLocaleDateString("id-ID")
                            : "-"}
                    </p>
                </div>
            </div>

            <div className="text-right">
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-sm rounded"
                >
                    Tutup
                </button>
            </div>
        </div>
    );
};

export default EmployeeDetail;
