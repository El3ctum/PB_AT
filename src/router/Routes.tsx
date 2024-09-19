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
                    <Route path="requisitions" element={<PrivateRoute><QuotationsPage /></PrivateRoute>} />
                    <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="admin" element={<PrivateRoute><AdminPage /></PrivateRoute>}>
                        <Route index element={<PrivateRoute><UserForm /></PrivateRoute>} />
                        <Route path="userForm" element={<PrivateRoute><UserForm /></PrivateRoute>} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;