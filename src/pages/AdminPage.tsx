import React from "react";
import RegistrationCard from "../components/RegistrationCard";
import { Outlet } from "react-router-dom";
import UserList from "../components/users/UserList";

const AdminPage: React.FC = () => {
    return (
        <section className="p-6 bg-gray-100 min-h-screen">
            <div className="container mx-auto">
                <div className="flex flex-wrap gap-6 mb-6">
                    <RegistrationCard title="User" description="Register a new User" route="userForm" />
                    <RegistrationCard title="Product" description="Register a new Product" route="productForm" />
                    <RegistrationCard title="Supplier" description="Register a new Supplier" route="supplierForm" />
                    <RegistrationCard title="Supplier" description="Register a new Supplier" route="supplierForm" />
                </div>
                <div className="mb-6">
                    <UserList />
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </section>
    );
}

export default AdminPage;
