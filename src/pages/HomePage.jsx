import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

export default function Home() {
  return (
    <div className="p-4 md:flex md:justify-between">
      <div className="md:w-1/2">
        <EmployeeList />
      </div>
      <div className="md:w-1/2">
        <EmployeeForm />
      </div>
    </div>
  );
}
