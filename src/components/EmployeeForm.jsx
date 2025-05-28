import { useEffect, useState } from "react";
import { createEmployee, updateEmployee } from "../api/employeeApi";
import { provinces } from "../helpers/dummy_data/region";
import { roleOptions } from "../helpers/option/rolesOption";
import { validationSchema } from "../helpers/validator/employeeValidation";

const EmployeeForm = ({ employee, onSuccess, onCancel }) => {
  const isEdit = !!employee;
  const [form, setForm] = useState({
    full_name: "",
    nik: "",
    gender: "",
    birth_place: "",
    birth_date: "",
    phone: "",
    province: "",
    city: "",
    district: "",
    subdistrict: "",
    address_detail: "",
    username: "",
    email: "",
    password: "",
    roles: [],
    contract_start: "",
    contract_end: "",
    marital_status: "",
    bpjs_code: "",
  });

  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);

  useEffect(() => {
    if (employee) {
      setForm({
        full_name: employee.full_name || "",
        nik: employee.nik || "",
        gender: employee.gender || "",
        birth_place: employee.birth_place || "",
        birth_date: employee.birth_date?.split("T")[0] || "",
        phone: employee.phone || "",
        province: employee.province || "",
        city: employee.city || "",
        district: employee.district || "",
        subdistrict: employee.subdistrict || "",
        address_detail: employee.address_detail || "",
        username: employee.username || "",
        email: employee.email || "",
        password: "",
        roles: employee.roles?.map((r) => r.name) || [],
        contract_start: employee.contract_start?.split("T")[0] || "",
        contract_end: employee.contract_end?.split("T")[0] || "",
        marital_status: employee.marital_status || "",
        bpjs_code: employee.bpjs_code || "",
      });

      // Inisialisasi dropdown lokasi
      const provObj = provinces.find((p) => p.name === employee.province);
      const cityObj = provObj?.cities.find((c) => c.name === employee.city);
      const distObj = cityObj?.districts.find((d) => d.name === employee.district);

      setCities(provObj?.cities || []);
      setDistricts(cityObj?.districts || []);
      setSubdistricts(distObj?.subdistricts || []);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "roles") {
      const updatedRoles = checked
        ? [...form.roles, value]
        : form.roles.filter((role) => role !== value);
      setForm((prev) => ({ ...prev, roles: updatedRoles }));
      return;
    }

    const newForm = { ...form, [name]: value };

    if (name === "province") {
      const selected = provinces.find((p) => p.name === value);
      setCities(selected?.cities || []);
      setDistricts([]);
      setSubdistricts([]);
      newForm.city = "";
      newForm.district = "";
      newForm.subdistrict = "";
    } else if (name === "city") {
      const selected = cities.find((c) => c.name === value);
      setDistricts(selected?.districts || []);
      setSubdistricts([]);
      newForm.district = "";
      newForm.subdistrict = "";
    } else if (name === "district") {
      const selected = districts.find((d) => d.name === value);
      setSubdistricts(selected?.subdistricts || []);
      newForm.subdistrict = "";
    }

    setForm(newForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(form, { abortEarly: false });
      setErrors({});

      const formData = new FormData();

      // Convert role names to IDs
      const selectedRoleIds = roleOptions
        .filter((r) => form.roles.includes(r.name))
        .map((r) => r.id);

      // Append fields
      Object.entries(form).forEach(([key, val]) => {
        if (key !== "roles") formData.append(key, val);
      });

      selectedRoleIds.forEach((id) => formData.append("roles[]", id));

      if (photo) {
        formData.append("photo", photo);
      }

      const result = isEdit
        ? await updateEmployee(employee.id, formData)
        : await createEmployee(formData);

      onSuccess?.(result);
    } catch (err) {
      if (err.inner) {
        const fieldErrors = {};
        err.inner.forEach((error) => {
          fieldErrors[error.path] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        alert("Terjadi kesalahan saat menyimpan: " + (err.message || "Unknown error"));
      }
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? "UPDATE KARYAWAN" : "TAMBAH KARYAWAN"}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          ["Nama Lengkap", "full_name"],
          ["No. Identitas", "nik"],
          ["Tempat Lahir", "birth_place"],
          ["No. Telepon", "phone"],
          ["Username", "username"],
          ["Email", "email"],
          ["Kode Dokter BPJS", "bpjs_code"],
        ].map(([label, name]) => (
          <div key={name}>
            <label className="block font-medium">{label}</label>
            <input
              type="text"
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
          </div>
        ))}

        <div>
          <label className="block font-medium">Jenis Kelamin</label>
          <div className="flex gap-4">
            {["Laki-laki", "Perempuan"].map((g) => (
              <label key={g} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={form.gender === g}
                  onChange={handleChange}
                />
                {g}
              </label>
            ))}
          </div>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        <div>
          <label className="block font-medium">Tanggal Lahir</label>
          <input
            type="date"
            name="birth_date"
            value={form.birth_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.birth_date && <p className="text-red-500 text-sm">{errors.birth_date}</p>}
        </div>

        {[["Provinsi", "province", provinces], ["Kota", "city", cities], ["Kecamatan", "district", districts], ["Kelurahan", "subdistrict", subdistricts]].map(
          ([label, name, options]) => (
            <div key={name}>
              <label className="block font-medium">{label}</label>
              <select
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Pilih {label}</option>
                {options.map((opt) => (
                  <option key={opt.name || opt} value={opt.name || opt}>
                    {opt.name || opt}
                  </option>
                ))}
              </select>
              {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
            </div>
          )
        )}

        <div className="md:col-span-2">
          <label className="block font-medium">Detil Alamat</label>
          <textarea
            name="address_detail"
            value={form.address_detail}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.address_detail && (
            <p className="text-red-500 text-sm">{errors.address_detail}</p>
          )}
        </div>

        {!isEdit && (
          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
        )}

        <div className="md:col-span-2">
          <label className="block font-medium">Role</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {roleOptions.map((role) => (
              <label key={role.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="roles"
                  value={role.name}
                  checked={form.roles.includes(role.name)}
                  onChange={handleChange}
                />
                {role.name}
              </label>
            ))}
          </div>
          {errors.roles && <p className="text-red-500 text-sm">{errors.roles}</p>}
        </div>

        <div>
          <label className="block font-medium">Tanggal Kontrak Mulai</label>
          <input
            type="date"
            name="contract_start"
            value={form.contract_start}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.contract_start && <p className="text-red-500 text-sm">{errors.contract_start}</p>}
        </div>

        <div>
          <label className="block font-medium">Tanggal Kontrak Selesai</label>
          <input
            type="date"
            name="contract_end"
            value={form.contract_end}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.contract_end && <p className="text-red-500 text-sm">{errors.contract_end}</p>}
        </div>

        <div>
          <label className="block font-medium">Status Menikah</label>
          <select
            name="marital_status"
            value={form.marital_status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Pilih Status</option>
            <option value="Menikah">Menikah</option>
            <option value="Belum Menikah">Belum Menikah</option>
          </select>
          {errors.marital_status && <p className="text-red-500 text-sm">{errors.marital_status}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium">Upload Foto</label>
          <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
          {employee?.photo && (
            <img
              src={`http://localhost:5000/uploads/${employee.photo}`}
              alt="Foto"
              className="w-24 mt-2 rounded border"
            />
          )}
        </div>

        <div className="md:col-span-2 flex justify-between mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
