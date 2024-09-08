import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BaseLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-400">
            <header className="bg-slate-600 p-4">
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link className="text-white" to={"/"}>Home</Link></li>
                        <li><Link className="text-white" to={"/login"}>Login</Link></li>
                    </ul>
                </nav>
            </header>

            <main className="flex-grow p-4">
                <Outlet />
            </main>

            <footer className="bg-slate-600 p-4 text-center text-white">
                <p>&copy; 2024 Infnet</p>
            </footer>
        </div>
    );
}

export default BaseLayout;
