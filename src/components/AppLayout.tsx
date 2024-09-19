import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';

const AppLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className='flex flex-1'>
                <aside className='w-64 bg-gray-800 text-white'>
                    <SidebarMenu />
                </aside>

                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
            <footer className='bg-slate-500 p-4 text-center'>
                <p>&copy; 2024 Infnet</p>
            </footer>
        </div>
    );
}

export default AppLayout;
