import { FaUserCircle } from "react-icons/fa";

const Header = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const photo = user?.photo;

    return (
        <header className="flex justify-between items-center p-4 border-b">
            <h1 className="font-semibold">Klinik Training</h1>
            <div className="flex items-center gap-2">
                <span>{user?.username}</span>
                {/* <span className="text-xs text-gray-500">({user?.roles?.join(", ")})</span> */}
                {photo ? (
                    <img
                        src={`http://localhost:5000/uploads/${photo}`}
                        alt="user"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                ) : (
                    <FaUserCircle className="w-8 h-8 text-gray-500" />
                )}
            </div>
        </header>
    );
};

export default Header;
