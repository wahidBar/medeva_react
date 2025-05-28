import axios from "axios";

const API_URL = "http://localhost:5000/api/employees";

// Ambil token dari localStorage
const getToken = () => localStorage.getItem("token");

export const getEmployees = async () => {
  const res = await axios.get(API_URL, {
    // headers: {
    //   Authorization: `Bearer ${getToken()}`,
    // },
  });
  return res.data;
};

export const createEmployee = async (formData) => {
  const res = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
};

export const updateEmployee = async (id, formData) => {
  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
};

export const deleteEmployee = async (id) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
