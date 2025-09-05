import React, { useEffect } from "react";
import FloatingShape from "./components/floatingShape";
import {Route, Routes} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import { useAuthStore } from "./Store/authStore";
import HomePage from "./pages/HomePage";
const App = () => {

  const {isCheckingAuth, checkAuth, isAuthenticated, user} = useAuthStore();

  useEffect(()=>{
    checkAuth();
  }, [checkAuth])

  console.log(isAuthenticated);
  console.log("user", user);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900 flex items-center justify-center relative overflow-hidden">
      {/* Existing ones */}
      <FloatingShape color="bg-indigo-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-blue-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-cyan-400" size="w-32 h-32" top="40%" left="-10%" delay={2} />

      {/* New contrasting shapes */}
      <FloatingShape color="bg-fuchsia-400" size="w-40 h-40" top="20%" left="70%" delay={3} shape="square" pattern="drift" />
      <FloatingShape color="bg-emerald-400" size="w-24 h-24" top="80%" left="20%" delay={6} shape="diamond" pattern="swirl" />
      <FloatingShape color="text-amber-400" size="w-32 h-32" top="50%" left="90%" delay={8} shape="ring" pattern="pulse" />


      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </div>
  );
};

export default App;
