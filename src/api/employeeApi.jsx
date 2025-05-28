import axios from "axios";

const API_URL = "http://localhost:5000/api/employees"; // Ganti jika backend kamu ada di alamat berbeda

export const getEmployees = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data karyawan:", error);
    throw error;
  }
};
export const createEmployee = async (formData) => {
  const res = await fetch("http://localhost:5000/api/employees", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Gagal menyimpan data karyawan");
  }

  return await res.json();
};

export const updateEmployee = async (id, formData) => {
  const res = await fetch(`http://localhost:5000/api/employees/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Gagal memperbarui data karyawan");
  }

  return await res.json();
};


export const deleteEmployee = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Gagal menghapus karyawan:", error);
    throw error;
  }
};

// export { createEmployee, deleteEmployee, getEmployees, updateEmployee };
