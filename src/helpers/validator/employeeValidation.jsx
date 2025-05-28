// employeeValidation.js
import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  full_name: Yup.string().required("Nama lengkap wajib diisi"),
  nik: Yup.string().required("No. identitas wajib diisi"),
  gender: Yup.string().required("Jenis kelamin wajib diisi"),
  birth_place: Yup.string().required("Tempat lahir wajib diisi"),
  birth_date: Yup.string().required("Tanggal lahir wajib diisi"),
  phone: Yup.string().required("No. telepon wajib diisi"),
  province: Yup.string().required("Provinsi wajib diisi"),
  city: Yup.string().required("Kota wajib diisi"),
  district: Yup.string().required("Kecamatan wajib diisi"),
  subdistrict: Yup.string().required("Kelurahan wajib diisi"),
  address_detail: Yup.string().required("Detil alamat wajib diisi"),
  username: Yup.string().required("Username wajib diisi"),
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: Yup.string().when("isEdit", {
    is: false,
    then: (schema) => schema.required("Password wajib diisi"),
    otherwise: (schema) => schema.notRequired(),
  }),
  roles: Yup.array().min(1, "Minimal satu tipe harus dipilih"),
  contract_start: Yup.string().required("Tanggal mulai kontrak wajib diisi"),
  contract_end: Yup.string().required("Tanggal selesai kontrak wajib diisi"),
  marital_status: Yup.string().required("Status menikah wajib diisi"),
  bpjs_code: Yup.string().required("Kode BPJS wajib diisi"),
});
