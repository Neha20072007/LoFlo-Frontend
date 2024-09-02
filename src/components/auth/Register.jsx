import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TailSpin } from 'react-loader-spinner'; 
// import leavesBackground from '/leaves.svg';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/users/register')
      .then(response => {
        if (response.data.isAuthenticated) {
          navigate('/login');
        }
      })
      .catch(error => {
        console.error('Error checking authentication:', error);
      });
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!name.match(namePattern)) {
      newErrors.name = 'Name must contain only alphabets and spaces.';
    }

    if (!email.match(emailPattern)) {
      newErrors.email = 'Invalid email address.';
    }

    if (!password.match(passwordPattern)) {
      newErrors.password = 'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character, and no consecutive digits.';
    }

    if (password !== retypePassword) {
      newErrors.retypePassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      axios.post('/api/users/register', { name, email, password })
        .then(response => {
          toast.success('Registration successful!', {
            style: { backgroundColor: '#6a994e', color: '#fff' },
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            icon: '🌿'
          });
          setTimeout(() => {
            navigate('/login');
          }, 1000);
        })
        .catch(error => {
          console.error(error);

          if (error.response) {
            if (error.response.status === 400) {
              toast.error('Invalid data provided. Please enter correct details.', {
                style: { backgroundColor: '#822f31', color: '#fff' },
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                icon: '⚠️'
              });
            } else if (error.response.status === 409) {
              toast.error('Email already registered.', {
                position: "top-right",
                style: { backgroundColor: '#822f31', color: '#fff' },
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                icon: '❌'
              });
            } else {
              toast.error('Server error. Please try again later.', {
                position: "top-right",
                style: { backgroundColor: '#822f31', color: '#fff' },
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                icon: '🔥'
              });
            }
          } else if (error.request) {
            toast.error('No response from server. Please check your internet connection.', {
              position: "top-right",
              style: { backgroundColor: '#822f31', color: '#fff' },
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
              icon: '🌐'
            });
          } else {
            toast.error('Error connecting to server. Please try again later.', {
              position: "top-right",
              style: { backgroundColor: '#822f31', color: '#fff' },
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
              icon: '❗'
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div style={{
      maxWidth: '28rem',
      margin: '0 auto',
      backgroundColor: '#f7f5df',
      padding: '2rem',
      marginTop: '6rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderWidth: '4px',
      borderColor: '#8bb38d',
      position: 'relative'
    }}>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar 
        theme="dark" 
        closeOnClick 
        pauseOnHover 
        draggable 
      />
      <h2 style={{
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: '#345734',
        marginBottom: '1.5rem'
      }}>
        Sign Up
      </h2>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TailSpin height="50" width="50" color="#8bb38d" ariaLabel="loading" />
          <p style={{ color: '#345734', marginTop: '1rem' }}>Sending email to register the user...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="name" style={{
              display: 'block',
              color: '#345734',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-[#739573] shadow-sm appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-[#8bb38d]"
              placeholder="Enter your name"
              disabled={loading}
            />
            {errors.name && <p style={{ color: 'red', fontSize: '0.875rem' }}>{errors.name}</p>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{
              display: 'block',
              color: '#345734',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-[#739573] shadow-sm appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-[#8bb38d]"
              placeholder="Enter your email"
              disabled={loading}
            />
            {errors.email && <p style={{ color: 'red', fontSize: '0.875rem' }}>{errors.email}</p>}
          </div>

          <div style={{ marginBottom: '1rem', position: 'relative' }}>
            <label htmlFor="password" style={{
              display: 'block',
              color: '#345734',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-[#739573] shadow-sm appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-[#8bb38d]"
              placeholder="Enter your password"
              disabled={loading}
            />
            {errors.password && <p style={{ color: 'red', fontSize: '0.875rem' }}>{errors.password}</p>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="retypePassword" style={{
              display: 'block',
              color: '#345734',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>Retype Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="retypePassword"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              className="border-[#739573] shadow-sm appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-[#8bb38d]"
              placeholder="Retype your password"
              disabled={loading}
            />
            
            <button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute right-10 flex items-center px-2 transform -translateY-1/2 top-1/2"
  disabled={loading} // Disable button when loading
>
  {showPassword ? (
    <i className="fas fa-eye-slash mt-6" style={{ color: '#739573' }}></i>
  ) : (
    <i className="fas fa-eye mt-6" style={{ color: '#739573' }}></i>
  )}
</button>


            {errors.retypePassword && <p style={{ color: 'red', fontSize: '0.875rem' }}>{errors.retypePassword}</p>}
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
            Register
          </button>
        </form>
      )}

<p className="mt-6 text-center text-[#345734]">
  Already have an account? <a href="/login" className="text-[#739573] font-semibold hover:underline decoration-wavy underline-offset-2">Sign in</a>🪴
</p>
    </div>
  );
}

export default Register;
