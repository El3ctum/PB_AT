import React from 'react';
import { Outlet } from 'react-router-dom'; // Se estiver usando React Router
import SidebarMenu from './SidebarMenu';

const AppLayout: React.FC = () => {
    return (
        <div className="base-layout">
            <header>
                <SidebarMenu />
            </header>

            <main>
                <Outlet />
            </main>

            <footer>
                <p>&copy; 2024 Infnet</p>
            </footer>
        </div>
    );
}

export default AppLayout;
