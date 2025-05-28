const EmployeeForm = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">FORM TAMBAH KARYAWAN</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Nama Lengkap *</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">
            No. Kartu Identitas *
          </label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-sm">Jenis Kelamin</label>
          <label>
            <input type="radio" name="gender" /> Laki-laki
          </label>
          <label>
            <input type="radio" name="gender" /> Perempuan
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium">Tempat Lahir</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Tanggal Lahir</label>
          <input type="date" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">No. Telepon</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Provinsi</label>
          <select className="w-full p-2 border rounded">
            <option>Pilih Provinsi</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Kota / Kabupaten</label>
          <select className="w-full p-2 border rounded">
            <option>Pilih Kota</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Kecamatan</label>
          <select className="w-full p-2 border rounded">
            <option>Pilih Kecamatan</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Kelurahan</label>
          <select className="w-full p-2 border rounded">
            <option>Pilih Kelurahan</option>
          </select>
        </div>
        <div className="col-span-full">
          <label className="block text-sm font-medium">Detil Alamat</label>
          <textarea className="w-full p-2 border rounded" rows="2"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Username *</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email *</label>
          <input type="email" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Password *</label>
          <input type="password" className="w-full p-2 border rounded" />
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium">Tipe *</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              "Manager",
              "Admin",
              "Resepsionis",
              "Manajemen",
              "Finance",
              "Kasir",
              "Purchasing",
              "Perawat",
              "Bidan",
              "Dokter",
              "Lainnya",
            ].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input type="checkbox" /> <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">
            Tanggal Mulai Kontrak
          </label>
          <input type="date" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Tanggal Selesai Kontrak
          </label>
          <input type="date" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Status Menikah</label>
          <select className="w-full p-2 border rounded">
            <option>Pilih Status</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Kode Dokter BPJS</label>
          <select className="w-full p-2 border rounded">
            <option>Pilih Kode Dokter</option>
          </select>
        </div>

        <div className="col-span-full text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
