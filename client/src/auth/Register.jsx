import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
//import { registerUser } from '../../redux/actions';
import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
const Register =() => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [passward, setPassward, ConfirmPassward] = useState('');
    const dispatch = useDispatch();

   const handleSubmit =(e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, passward }));
   };

return (
   <section className='h-screen bg-white flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0'>
           <div className='md:w-1/3 max-w-sm'>
             {/*  <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?ga=GA1.1.2090728591.1744713562&semt=ais_hybrid&w=740" alt="login img"/>*/}

             <h1>LOGO</h1>
             <p>DISCRIPTION</p>
           </div>
            
        
   
           <div className='md:w-1/3 max-w-sm'>
           
       <form onSubmit={ handleSubmit } className=" max-w-md mx-auto p-5 ">
           <h2 className="text-4xl mb-4 text-center ">Register</h2>
           <input 
               type='Name'
               placeholder="Name"
               value={name}
               onChange={(e) => setName(e.target.value)}
               className="border  p-3 mb-4 w-full"
               />
               <input 
               type='email'
               placeholder="Email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="border p-3 mb-4 w-full"
               />
               <input
               type="passsward"
               placeholder="Passward"
               value={passward}
               onChange={(e) => setPassward(e.target.value)}
               className="border  mb-4 w-full  p-3"
               />
               <input
               type="ConfirmPass"
               placeholder="ConfirmPassward"
               value={ConfirmPassward}
               onChange={(e) => ConfirmPassward(e.target.value)}
               className="border  mb-4 w-full  p-3"
               />
               <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
               {/*<a
               className="text-black to-red-500 hover:text-blue-700 hover:underline hover:underline-offset-4 p-3"
               href="#"
             >
               Forgot Password?
             </a>
               */}
             <button
               type="button"
               className="  mx-6 h-7 w-7 rounded-full  bg-blue-400 hover:bg-blue-700  text-blue shadow-[0_4px_9px_-4px_#3b71ca]">
                <BiLogoFacebook
             
                 size={30}
                 className="  flex justify-center items-center w-full"/>
             </button>
             <button
               type="button"
               className="inlne-block m h-7 w-7 rounded-full bg-blue-400 hover:bg-blue-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
             ><AiOutlineTwitter
               
                 size={30}
                 className="flex justify-center items-center w-full"
               />
             </button>
           
       </form>
       </div>
       </section>
);
}

export default Register;