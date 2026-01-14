// src/pages/ForgotPassword.jsx
import React from "react";
import forgotOffice from "../assets/img/forgot-password-office.jpeg";
import forgotOfficeDark from "../assets/img/forgot-password-office-dark.jpeg";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 p-6">
      <div className="flex flex-col md:flex-row w-full max-w-5xl overflow-hidden rounded-xl shadow-2xl bg-gray-900 text-white">
        
        {/* Left Image */}
        <div className="md:w-1/2 h-60 md:h-auto relative transform transition duration-700 hover:scale-105">
          <img
            aria-hidden="true"
            src={forgotOffice}
            alt="Office"
            className="object-cover w-full h-full rounded-l-xl dark:hidden"
          />
          <img
            aria-hidden="true"
            src={forgotOfficeDark}
            alt="Office Dark"
            className="hidden object-cover w-full h-full rounded-l-xl dark:block"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent rounded-l-xl"></div>
          <div className="absolute bottom-6 left-6">
            <h2 className="text-3xl font-bold">Forgot Password?</h2>
            <p className="text-gray-300 mt-2 text-sm">Enter your email to reset</p>
          </div>
        </div>

        {/* Right Form */}
        <main className="md:w-1/2 flex items-center justify-center p-6 sm:p-12 transform transition duration-700 hover:scale-105">
          <div className="w-full">
            <h1 className="mb-6 text-3xl font-bold text-emerald-400">Recover Password</h1>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  name="verifyEmail"
                  placeholder="john@doe.com"
                  className="block w-full h-12 px-3 py-2 mt-1 text-white text-sm rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 placeholder-gray-400 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 mt-4 px-4 py-2 text-sm font-semibold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 active:bg-emerald-700 transition-all shadow-lg"
              >
                Recover Password
              </button>
            </form>

            <p className="mt-6 text-sm text-gray-300">
              <a
                href="/login"
                className="text-emerald-400 hover:underline"
              >
                Already have an account? Login
              </a>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ForgotPassword;
