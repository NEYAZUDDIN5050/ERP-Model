import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { BiLogoFacebook } from 'react-icons/bi';
import { AiOutlineTwitter } from 'react-icons/ai';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state

    // Trim inputs to avoid sending malformed data
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Basic client-side validation
    if (!trimmedEmail || !trimmedPassword) {
      toast.error('Please provide both email and password');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        '/api/auth/login', // Ensure this matches your backend route
        { email: trimmedEmail, password: trimmedPassword },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const { success, message, token } = response.data;
      console.log('Login response:', response.data);

      if (success) {
        localStorage.setItem('token', token);
        toast.success(message);
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        toast.error(message);
      }
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false); // Reset loading state
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
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 md:w-1/2 p-4 sm:p-8 flex flex-col items-center text-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-500">
          Welcome Back to BizERP
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-md">
          Log in to securely manage your business operations with our powerful ERP system.
        </p>
        <Link
          to="/"
          className="mt-6 text-indigo-300 hover:text-indigo-100 underline transition-colors duration-300"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-md p-4 sm:p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 w-full transform transition-all duration-300 hover:shadow-xl"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-gray-800">
            Login
          </h2>

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
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading} // Disable button during loading
            className={`bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-3 rounded-lg w-full hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <div className="flex justify-between mt-4 text-sm text-gray-600">
            <Link to="#" className="hover:text-indigo-600 underline transition-colors duration-300">
              Forgot Password?
            </Link>
            <Link to="/register" className="hover:text-indigo-600 underline transition-colors duration-300">
              Create Account
            </Link>
          </div>

          <div className="flex items-center justify-center mt-6 gap-4">
            <button
              type="button"
              className="h-10 w-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-colors duration-300"
              aria-label="Login with Facebook"
            >
              <BiLogoFacebook size={22} />
            </button>
            <button
              type="button"
              className="h-10 w-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-colors duration-300"
              aria-label="Login with Twitter"
            >
              <AiOutlineTwitter size={22} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;