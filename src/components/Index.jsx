import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext'; // Update the path as needed
import { useNavigate } from 'react-router-dom';

function Index() {
  const { user } = useAuth(); // Get user info from context
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.id) {
      // Redirect to login if no user is authenticated
      navigate('/login');
      return;
    }

    console.log("User:", user);
    console.log("Fetching todos for user ID:", user.id);

    // Fetch todos for the logged-in user
    axios.get(`/api/todos/user/${user.id}`)
      .then(response => {
        setTodos(response.data);
        console.log("Todos received:", response.data);
      })
      .catch(error => {
        console.error(error);
        toast.error('Error fetching todos', {
          style: { backgroundColor: '#822f31', color: '#fff' }, // Custom error style
          icon: '⚠️',
        });
      });
  }, [user, navigate]);

  const handleDelete = (id) => {
    axios.delete(`/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
        toast.success('Todo deleted successfully', {
          style: { backgroundColor: '#6a994e', color: '#fff' }, // Custom success style
          icon: '🍁',
        });
      })
      .catch(error => {
        console.error(error);
        toast.error('Error deleting todo', {
          style: { backgroundColor: '#822f31', color: '#fff' }, // Custom error style
          icon: '❌',
        });
      });
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center" >
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

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#e2dbbe] font-merriweather underline decoration-wavy decoration-[#739573] underline-offset-8">🌿 ToDos 🌿</h1>
        <a
          className="mt-4 inline-block text-[#e2dbbe] px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:underline decoration-wavy underline-offset-2"
          href="/create-todo"
        >
          Add ToDo
        </a>
      </div>

      <div className="w-full max-w-2xl space-y-4">
        {Array.isArray(todos) && todos.length > 0 ? (
            todos.map(item => (
              <div
                key={item.id}
                className="p-6 rounded-lg border-2 border-[#e2dbbe] bg-[#3c6e47] text-[#e2dbbe] flex flex-col"
                style={{ backgroundColor: '#3c6e47', borderColor: '#e2dbbe'}}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold underline decoration-wavy decoration-[#739573] underline-offset-4 hover:text-[#dbe16f]">{item.description}</h2>
                  <span className={`px-2 py-1 rounded-lg text-sm ${item.isComplete ? 'bg-[#d6ea8d] text-[#366410]' : 'bg-[#6d2020] text-[#ccebb3]'}`}>
                    {item.isComplete ? 'Completed' : 'Incomplete'}
                  </span>
                </div>
                <p className="text-[#e2d  bbe]">
                  <strong>Last Changed:</strong> {new Date(item.updatedAt).toLocaleString()}
                </p>

                {/* Flex container for Edit and Delete */}
                <div className="mt-4 flex justify-between items-center">
                  {/* Edit Link on the Left */}
                  <a
                    className="text-[#e2dbbe] underline decoration-wavy decoration-[#739573] underline-offset-4 hover:text-[#8bb38d]"
                    href={`/edit/${item.id}`}
                  >
                    Edit
                  </a>

                  {/* Delete Button on the Right */}
                  <button
                    className="bg-[#6d2020] text-[#ccebb3] px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:bg-[#b84a4a]"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-[#e2dbbe]">You Got No ToDos 😞</p>
          )}
        </div>
    </div>
  );
}

export default Index;
