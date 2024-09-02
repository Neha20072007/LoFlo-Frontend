import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../components/context/AuthContext'; // Adjust the path as needed

function NewTodo() {
  const [description, setDescription] = useState('');
  const { user } = useAuth(); // Get user details from AuthContext

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('User not logged in', {
        style: { backgroundColor: '#822f31', color: '#fff' }, // Custom error style
        icon: '⚠️',
      });
      return;
    }

    axios.post(`/api/todos/user/${user.id}`, { description })
      .then(response => {
        toast.success('ToDo Added successfully', {
          style: { backgroundColor: '#6a994e', color: '#fff' }, // Custom success style
          icon: '🫧',
        });
        setTimeout(() => {
          window.location.href = '/index';
        }, 1000); // Redirect after 1 second
      })
      .catch(error => {
        console.error(error);
        toast.error('Error creating ToDo', {
          style: { backgroundColor: '#822f31', color: '#fff' }, // Custom error style
          icon: '❌',
        });
      });
  };

  return (
    <div 
      className="container mx-auto p-4 h-screen flex justify-center items-center" 
    >
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar 
        theme="dark" 
        closeOnClick 
        pauseOnHover 
        draggable 
      />
      <div className="w-full max-w-lg mx-auto bg-[#f7f5df] p-8 rounded-lg shadow-md border-4 border-[#8bb38d]">
        <div className="flex justify-between items-center mb-4">
          {/* Updated Button Theme */}
          <button 
            onClick={() => window.location.href = '/index'} 
            className="text-[#345734] px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:underline decoration-wavy underline-offset-2"
          >
            <i className="bi bi-arrow-left-square-fill"></i> Go Back?
          </button>
        </div>
        <h2 className="text-2xl text-[#345734] font-merriweather font-semibold mb-6">Add a New Todo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="description" className="block text-[#345734] text-sm font-bold mb-2">Add Description</label>
            <input
              className="shadow-sm appearance-none border-2 border-[#739573] rounded-lg w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-[#8bb38d]"
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>
          {/* Submit Button with Updated Theme */}
          <button
            type="submit"
            className="text-[#345734] px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:underline decoration-wavy underline-offset-2"
          >
            <i className="bi bi-plus-square-fill"></i> Add Todo
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewTodo;
