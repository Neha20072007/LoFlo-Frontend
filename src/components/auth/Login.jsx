import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Update the path as needed
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TailSpin } from 'react-loader-spinner';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();
  const location = useLocation(); // Access the location object

  useEffect(() => {
    // Check if redirected from Register component
    if (location.state?.fromRegister) {
      toast.info('Email sent to registered mail!', {
        style: { backgroundColor: '#6a994e', color: '#fff' },
        icon: '✉️',
        position: "top-right",
        autoClose: 2500,
      });
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post('/api/users/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const userDetails = response.data; // Assuming the response contains user data
      login(userDetails); // Set authenticated state and user details

      // Custom success toast
      toast.success('Login successful!', {
        style: { backgroundColor: '#6a994e', color: '#fff' }, // Success style
        icon: '🍂',
        position: "top-right",
        autoClose: 2500,
      });

      setTimeout(() => {
        navigate('/index'); // Redirect to home after showing toast
      }, 1000);

    } catch (error) {
      console.error('Error logging in:', error);

      if (error.response) {
        // Handle error response from the server
        toast.error("Wrong Credentials", {
          style: { backgroundColor: '#822f31', color: '#fff' }, // Error style
          icon: '❌',
          position: "top-right",
        });
      } else {
        // Handle any other unexpected errors
        toast.error('An unexpected error occurred. Please try again later.', {
          style: { backgroundColor: '#822f31', color: '#fff' }, // Error style
          icon: '⚠️',
          position: "top-right",
        });
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#f7f5df] p-8 my-24 rounded-lg shadow-md border-4 border-[#8bb38d] relative">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        theme="dark"
        closeOnClick
        pauseOnHover
        draggable
      />
      <h2 className="text-3xl font-bold text-[#345734] mb-6">Log In</h2>

      {loading ? (
        <div className="flex justify-center items-center">
          <TailSpin
            height="50"
            width="50"
            color="#8bb38d"
            ariaLabel="loading"
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-[#345734] text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-[#739573] shadow-sm appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-[#8bb38d]"
              placeholder="Enter your email"
              disabled={loading} // Disable input when loading
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-[#345734] text-sm font-semibold mb-2">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-[#739573] shadow-sm appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-[#8bb38d]"
              placeholder="Enter your password"
              disabled={loading} // Disable input when loading
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-2"
              disabled={loading} // Disable button when loading
            >
              {showPassword ? (
                <i className="fas mt-6 fa-eye-slash" style={{ color: '#739573' }}></i>
              ) : (
                <i className="fas mt-6 fa-eye" style={{ color: '#739573' }}></i>
              )}
            </button>
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: '#7dbf7b',
              color: '#fff',
              fontWeight: '600',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              marginTop: '1rem',
              transition: 'background-color 0.3s ease',
              outline: 'none',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              width: '100%'
            }}
            disabled={loading}
          >
            Log In
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-[#345734]">
        Don't have an account? <a href="/register" className="text-[#739573] font-semibold hover:underline decoration-wavy underline-offset-2">Sign up</a>🌱
      </p>
    </div>
  );
}

export default Login;
