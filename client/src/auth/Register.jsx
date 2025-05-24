import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!name || !email || !password || !confirmPassword) {
      toast.error('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      const response = await axios.post(
        '/api/auth/signup', // Use proxy path
        { name, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Server response:', response.data);
      const { token, message } = response.data;

      // Store JWT in localStorage
      localStorage.setItem('token', token);
      toast.success(message || 'Registered successfully!');
      setTimeout(() => navigate('/dashboard'), 1000);

      // Clear form
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Registration error:', err.response?.data);
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <section
      className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1553356085-576c43617024?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Left Section - Welcome Text */}
      <div className="relative z-10 md:w-1/2 p-4 sm:p-8 flex flex-col items-center text-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-500">
          Join BizERP Today
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-md">
          Create an account to streamline your business operations with our powerful ERP solution.
        </p>
        <Link
          to="/"
          className="mt-6 text-indigo-300 hover:text-indigo-100 underline transition-colors duration-300"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Right Section - Form */}
      <div className="relative z-10 w-full max-w-md p-4 sm:p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 w-full transform transition-all duration-300 hover:shadow-xl"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-gray-800">
            Create an Account
          </h2>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>
          <div className="mb-6 relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-3 rounded-lg w-full hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Register
          </button>

          <p className="text-sm mt-4 text-center text-gray-600">
            Already registered?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-800 underline transition-colors duration-300">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;