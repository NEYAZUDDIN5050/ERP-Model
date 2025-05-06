import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
//import { registerUser } from '../../redux/actions'; // Ensure this exists
//import registerImage from '../../assets/register-illustration.png'; // Replace with your actual image path

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = { name, email, password };
    
    dispatch(registerUser(userData));
    navigate('/dashboard');
  };

  return (
    <section className='h-screen flex flex-col md:flex-row items-center justify-center bg-cover' style={{backgroundImage:"url('https://static.vecteezy.com/system/resources/previews/007/164/537/non_2x/fingerprint-identity-sensor-data-protection-system-podium-hologram-blue-light-and-concept-free-vector.jpg')" }}>

      {/* Image/Brand Side */}
      <div className='md:w-1/2 p-8 flex flex-col items-center text-center'>
       
        <h1 className="text-3xl font-bold mt-80 text-white">Welcome to BizERP</h1>
        <p className="text-sm mt-2 text-gray-600">Manage your business efficiently with our powerful ERP solution.</p>

        <Link to="/dashboard" className="mt-6 inline-block text-blue-600 underline">
          ← Back to Home
        </Link>
      </div>

      {/* Form Side */}
      <div className='md:w-100 p-8'>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center">Create an Account</h2>

          <input
            type='text'
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 mb-3 w-full rounded"
            required
          />
          <input
            type='email'
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 mb-3 w-full rounded"
            required
          />
          <input
            type='password'
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mb-3 w-full rounded"
            required
          />
          <input
            type='password'
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border p-2 mb-3 w-full rounded"
            required
          />
          <button type="submit" className="bg-blue-600 text-white p-1 rounded w-full hover:bg-blue-700 transition">
            Register
          </button>

          <p className="text-sm mt-4 text-center">
            Already registered? <Link to="/login" className="text-blue-600 underline">Login here</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;


