import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', formData);
      
      // Save data for session persistence and dynamic UI
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user)); 
      
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 border rounded mb-4 outline-none"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-3 border rounded mb-6 outline-none"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required 
        />
        <button className="w-full bg-indigo-600 text-white py-3 rounded font-bold hover:bg-indigo-700">
          Sign In
        </button>
        <p className="mt-4 text-center text-sm">
          New here? <Link to="/signup" className="text-indigo-600 font-bold">Create an account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;