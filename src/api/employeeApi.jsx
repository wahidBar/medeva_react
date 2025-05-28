import axios from "axios";

const API_URL = "http://localhost:5000/api/employees"; // Ganti jika backend kamu ada di alamat berbeda

const getEmployees = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data karyawan:", error);
    throw error;
  }
};

const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(API_URL, employeeData);
    return response.data;
  } catch (error) {
    console.error("Gagal menambah karyawan:", error);
    throw error;
  }
};

const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, employeeData);
    return response.data;
  } catch (error) {
    console.error("Gagal mengupdate karyawan:", error);
    throw error;
  }
};

const deleteEmployee = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Gagal menghapus karyawan:", error);
    throw error;
  }
};

export { createEmployee, deleteEmployee, getEmployees, updateEmployee };
