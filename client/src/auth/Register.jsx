import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/actions'; // Make sure you import the action

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(registerUser({ name, email, password }));
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <section className='h-screen bg-white flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0'>
      <div className='md:w-1/3 max-w-sm'>
        <h1>LOGO</h1>
        <p>DISCRIPTION</p>
      </div>
      <div className='md:w-1/3 max-w-sm'>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-5">
          <h2 className="text-4xl mb-4 text-center">Register</h2>
          <input 
            type='text' 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="border p-3 mb-4 w-full" 
          />
          <input 
            type='email' 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="border p-3 mb-4 w-full" 
          />
          <input 
            type='password' 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="border p-3 mb-4 w-full" 
          />
          <input 
            type='password' 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            className="border p-3 mb-4 w-full" 
          />
          <button type="submit" className="bg-gray-700 text-white p-2 w-full">Register</button>
        </form>
      </div>
    </section>
  );
}

export default Register;
