import { LogOut, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
        <ShoppingBag size={28} />
        <span>FashionHub</span>
      </div>
      <button onClick={handleLogout} className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition">
        <LogOut size={20} /> Logout
      </button>
    </nav>
  );
};

export default Navbar;