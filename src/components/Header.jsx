
const Header = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <header className="flex justify-between items-center p-4 border-b">
            <h1 className="font-semibold">Klinik Training</h1>
            <div className="flex items-center gap-2">
                <span>{user?.username}</span>
                <span className="text-xs text-gray-500">({user?.roles?.join(", ")})</span>
                <img src="/logo.png" alt="user" className="w-8 h-8 rounded-full" />
            </div>
        </header>
    );
};

export default Header;