import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../components/context/AuthContext'; // Adjust the path as needed

function EditTodo() {
  const { id } = useParams();
  const [description, setDescription] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const { user } = useAuth(); // Get user details from AuthContext

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`/api/todos/${id}`);
        const { description, isComplete } = response.data;
        setDescription(description);
        setIsComplete(isComplete);
      } catch (error) {
        if (error.response) {
          toast.error(`Error: ${error.response.status} - ${error.response.statusText}`, {
            style: { backgroundColor: '#822f31', color: '#fff' }, // Customize error toast
            icon: '⚠️',
          });
        } else if (error.request) {
          toast.error('No response received from server.', {
            style: { backgroundColor: '#822f31', color: '#fff' }, // Customize warning toast
            icon: '⚠️',
          });
        } else {
          toast.error('Error fetching ToDos', {
            style: { backgroundColor: '#822f31', color: '#fff' },
            icon: '⚠️',
          });
        }
      }
    };

    fetchTodo();
  }, [id]);

  const updateTodo = (id, description, isComplete, user) => {
    axios.put(`/api/todos/${id}`, { description, isComplete, userId: user.id })
      .then(response => {
        toast.success('ToDo Edited successfully', {
          style: { backgroundColor: '#6a994e', color: '#fff' }, // Customize success toast
          icon: '✅',
        });
        setTimeout(() => {
          window.location.href = '/index'; // Adjust the path as needed
        }, 1000); // Redirect after 1 second
      })
      .catch(error => {
        toast.error('Error updating ToDo', {
          style: { backgroundColor: '#822f31', color: '#fff' },
          icon: '❌',
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('User not logged in', {
        style: { backgroundColor: '#822f31', color: '#fff' },
        icon: '❌',
      });
      return;
    }

    updateTodo(id, description, isComplete, user);
  };

  return (
    <div 
      className="container mx-auto p-4 flex justify-center items-center h-screen" 
    >
      {/* Customize Toast Container */}
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
          {/* Back Button with Updated Theme */}
          <button 
            onClick={() => window.location.href = '/index'} 
            className="text-[#345734] px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:underline decoration-wavy underline-offset-2"
          >
            <i className="bi bi-arrow-left-square-fill"></i> Go Back?
          </button>
        </div>
        <h2 className="text-2xl text-[#345734] font-merriweather font-semibold mb-6">Edit Todo</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
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
          <div className="mb-4 flex items-center">
            <input
              className="form-check-input h-4 w-4 text-[#739573] border-gray-300 rounded focus:ring-[#8bb38d]"
              type="checkbox"
              id="inputIsComplete"
              checked={isComplete}
              onChange={(e) => setIsComplete(e.target.checked)}
            />
            <label className="ml-2 block text-[#345734] text-sm font-bold" htmlFor="inputIsComplete">
              Completed?
            </label>
          </div>
          {/* Update Button with Updated Theme */}
          <button
            type="submit"
            className="text-[#345734] px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:underline decoration-wavy underline-offset-2"
          >
            <i className="bi bi-plus-square-fill"></i> Update Todo
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditTodo;
