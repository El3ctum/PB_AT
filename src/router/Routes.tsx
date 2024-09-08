import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignupPage from "../pages/SignupPage";
import PrivateRoute from "./PrivateRouter";
import Dashboard from "../pages/Dashboard";
import AppLayout from "../components/AppLayout";
import BaseLayout from "../components/BaseLayout";
import LoginPage from "../pages/LoginPage";

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
                    <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;