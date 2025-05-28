import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

const EmployeePage = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EmployeeList />
            <EmployeeForm />
        </div>
    );
};

export default EmployeePage;