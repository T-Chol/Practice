import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';  // Import Firebase authentication function
import { auth } from '../firebase-config';  // Import Firebase configuration
import '../styles.css';

const LoginPage = () => {
  // State to handle user inputs for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // State to handle success or error messages
  const navigate = useNavigate(); // Hook to programmatically navigate between routes

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Firebase authentication using email and password
      await signInWithEmailAndPassword(auth, email, password);
      
      // Set a success message
      setMessage('Login successful! Redirecting to your profile...');

      // Redirect to the profile page after a short delay
      setTimeout(() => {
        navigate('/profile');
      }, 1000);
    } catch (error) {
      // If there's an error during login, display the error message
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="login-title">Login to Your Account</h2>
        {/* Login form */}
        <form onSubmit={handleLogin} className="login-form">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="login-input" 
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="login-input" 
            required
          />
          {/* Submit button */}
          <button type="submit" className="login-button">Login</button>
        </form>
        {/* Display message for success or error */}
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
