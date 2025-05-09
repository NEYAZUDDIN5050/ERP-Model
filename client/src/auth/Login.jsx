import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
// import { loginUser } from '../../redux/actions'; // Uncomment and use your login action
import { BiLogoFacebook } from "react-icons/bi";
import { AiOutlineTwitter } from "react-icons/ai";
import axios from "axios";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
  
      const { success, message } = data;
  
      if (success) {
        console.log("Login successful:", message);
        // handleSuccess(message); ← replace with toast or actual function
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        console.error("Login failed:", message);
        // handleError(message); ← replace with toast or actual function
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  
    // Clear form fields
    setEmail('');
    setPassword('');
  };
  

  return (
    <section
      className="h-screen flex flex-col md:flex-row items-center justify-center bg-cover"
      style={{
        backgroundImage:
          "url('https://image.freepik.com/free-vector/vector-abstract-security-system-concept-with-fingerprint-technology-background_43778-497.jpg')",
      }}
    >
      {/* Left Section */}
      <div className="md:w-1/2 p-8 flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold mt-80 text-white">Welcome Back!</h1>
        <p className="text-sm mt-2 text-gray-300">
          Securely log in to manage your business with BizERP.
        </p>
        <Link to="/" className="mt-6 inline-block text-blue-400 underline">
          ← Back to Home
        </Link>
      </div>

      {/* Right Section - Form */}
      <div className="md:w-100 p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto w-full"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 mb-3 w-full rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mb-3 w-full rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700 transition"
          >
            Login
          </button>

          <div className="flex justify-between mt-4 text-sm">
            <Link to="#" className="text-blue-600 underline">
              Forgot Password?
            </Link>
            <Link to="/register" className="text-blue-600 underline">
              Create Account
            </Link>
          </div>

          <div className="flex items-center justify-center mt-5 gap-4">
            <button
              type="button"
              className="h-9 w-9 rounded-full bg-gray-700 hover:bg-gray-800 text-white flex items-center justify-center"
            >
              <BiLogoFacebook size={20} />
            </button>
            <button
              type="button"
              className="h-9 w-9 rounded-full bg-gray-700 hover:bg-gray-800 text-white flex items-center justify-center"
            >
              <AiOutlineTwitter size={20} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;

