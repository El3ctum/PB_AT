import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const SidebarMenu = () => {
    const { logout, activeUserData } = useAuth();

    const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to log out?")) {
            logout();
        }
    };

    return (
        <aside className="bg-slate-600 min-h-full p-4">
            <nav>
                <ul className="space-y-4">
                    <li>
                        <Link
                            className="text-white hover:text-gray-300 focus:text-gray-400"
                            to="requisitions"
                        >
                            Requisitions
                        </Link>
                    </li>
                    {activeUserData?.role === "admin" &&
                        <>
                            <li>
                                <Link
                                    className="text-white hover:text-gray-300 focus:text-gray-400"
                                    to="dashboard"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-white hover:text-gray-300 focus:text-gray-400"
                                    to="admin"
                                >
                                    Admin
                                </Link>
                            </li>
                        </>}
                    <li>
                        <Link
                            className="text-white hover:text-gray-300 focus:text-gray-400"
                            to="/"
                            onClick={handleLogout}
                        >
                            Logout
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default SidebarMenu;
