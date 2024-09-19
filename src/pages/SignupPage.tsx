import React from "react";
import SignupForm from "../components/SignupForm";
import { Link } from "react-router-dom";

const SignupPage: React.FC = () => {
    return (
        <section className="bg-dark-gray flex flex-row justify-center items-center w-full h-screen">
            <div className="flex bg-gray-800 rounded-lg overflow-hidden shadow-lg w-4/5 max-w-4xl">
                {/* Left Side */}
                <div className="flex-1 bg-no-repeat bg-cover bg-right-top" style={{ backgroundImage: "url('src/assets/towfiqu-barbhuiya-TRsI6PADvas-unsplash.jpg')" }}>
                    <div className="p-8 text-white flex flex-col justify-between h-full">
                        <div>
                            <h1 className="text-xl font-semibold text-orange">AMU</h1>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-yellow">Let's simplify the quoting process, so you can focus on what matters most.</h2>
                            <p className="mt-4 text-gray-300">Tailored quotes for your unique needs.</p>
                        </div>
                        <div className="mt-8">
                            <Link to={"/"} className="bg-orange text-dark-gray py-2 px-4 rounded-full hover:bg-yellow">Back to website</Link>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex-1 bg-dark-gray p-8">
                    <h2 className="text-3xl font-bold text-white mb-4">Create an account</h2>
                    <p className="text-gray-400 mb-6">Already have an account? <Link to={"/login"} className="text-orange-500 hover:underline">Log in</Link></p>
                    <SignupForm />
                </div>
            </div>
        </section>
    );
};

export default SignupPage;
