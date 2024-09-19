import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const BaseLayout: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className="flex flex-col min-h-screen bg-dark-gray">
            {currentPath !== "/" && (
                <header className="bg-gray-800 backdrop-blur-lg p-4 border-white border-b-2">
                    <nav>
                        <ul className="flex space-x-4">
                            <li className='p-4 hover:bg-orange-100 rounded-lg'>
                                <Link className="text-orange-400 hover:underline" to="/">Home</Link>
                            </li>
                            {/* <li className='p-4 hover:bg-orange-100 rounded-lg'>
                                <Link className="text-orange-400 hover:underline" to="/login">Login</Link>
                            </li>
                            <li className='p-4 hover:bg-orange-100 rounded-lg'>
                                <Link className="text-orange-400 hover:underline" to="/signup">Sign Up</Link>
                            </li> */}
                        </ul>
                    </nav>
                </header>
            )}

            <main className="flex-grow p-4 bg-gray-800">
                <Outlet />
            </main>

            <footer className="bg-gray-800 backdrop-blur-lg p-4 text-center text-orange-400 border-white-300 border-t-2">
                <p>&copy; 2024 YouQuote</p>
            </footer>
        </div>
    );
}

export default BaseLayout;
