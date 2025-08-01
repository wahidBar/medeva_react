import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Layout from "./components/Layouts.jsx";
import Login from "./pages/Login.jsx";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
