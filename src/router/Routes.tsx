import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignupPage from "../pages/SignupPage";
import PrivateRoute from "./PrivateRouter";
import Dashboard from "../pages/Dashboard";
import AppLayout from "../components/AppLayout";
import BaseLayout from "../components/BaseLayout";
import LoginPage from "../pages/LoginPage";
import QuotationsPage from "../pages/QuotationsPage";
import AdminPage from "../pages/AdminPage";
import UserForm from "../components/users/Userform";
import ProductManager from "../components/products/ProductManager";
import UserManager from "../components/users/userManager";
import SupplierManager from "../components/suppliers/SupplierManager";
import ContactManager from "../components/contacts/ContactManager";
import RequisitionManager from "../components/requisition/RequisitionManager";
import QuotationManager from "../components/quotations/QuotationManager";
//import SignupForm from "../components/SignupForm";

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BaseLayout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                </Route>
                <Route path="/app" element={<PrivateRoute><AppLayout /></PrivateRoute>}>
                    <Route path="quotations" element={<PrivateRoute><QuotationsPage /></PrivateRoute>} />
                    <Route path="requisitions" element={<PrivateRoute><RequisitionManager /></PrivateRoute>}>
                        <Route path=":id" element={<PrivateRoute><QuotationManager /></PrivateRoute>} />
                    </Route>
                    <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="admin" element={<PrivateRoute><AdminPage /></PrivateRoute>}>
                        <Route index element={<PrivateRoute><UserForm /></PrivateRoute>} />
                        <Route path="userForm" element={<PrivateRoute><UserManager /></PrivateRoute>} />
                        <Route path="productForm" element={<PrivateRoute><ProductManager /></PrivateRoute>} />
                        <Route path="supplierForm" element={<PrivateRoute><SupplierManager /></PrivateRoute>}>
                            <Route path=":id" element={<PrivateRoute><ContactManager /></PrivateRoute>} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;