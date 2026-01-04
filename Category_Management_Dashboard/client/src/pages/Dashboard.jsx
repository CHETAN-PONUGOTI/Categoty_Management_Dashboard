import { useEffect, useState } from 'react';
import API from '../api/axios';
import Sidebar from '../components/Sidebar';
import CategoryCard from '../components/CategoryCard';
import { Plus, X, Search, Bell, MessageSquare } from 'lucide-react';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState({ name: '', itemCount: '', imageUrl: '' });
  const [user, setUser] = useState({ name: 'Guest' });

  useEffect(() => {
    // Retrieve the user object stored during login
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await API.get('/categories');
      setCategories(data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch failed:", err);
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Data Cleaning: Convert itemCount to Number before sending
      const payload = {
        ...newCategory,
        itemCount: Number(newCategory.itemCount)
      };
      
      await API.post('/categories', payload);
      setShowModal(false);
      setNewCategory({ name: '', itemCount: '', imageUrl: '' }); // Reset form
      fetchCategories(); // Refresh the grid
    } catch (err) {
      alert(err.response?.data?.error || "Failed to save category");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        {/* Header matching your reference */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search..." className="w-full bg-gray-50 rounded-md py-2 pl-10 outline-none" />
          </div>
          <div className="flex items-center gap-4">
            <MessageSquare className="text-gray-400 cursor-pointer" size={20} />
            <Bell className="text-gray-400 cursor-pointer" size={20} />
            <div className="flex items-center gap-2 border-l pl-4 ml-2">
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs">R</div>
              <span className="text-sm font-medium">{user.name}</span>
            </div>
          </div>
        </header>

        <main className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 text-white px-5 py-2 rounded-md font-medium hover:bg-indigo-700 transition flex items-center gap-2"
            >
              <Plus size={18} /> Add Category
            </button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          )}

          {!loading && categories.length === 0 && (
            <div className="mt-10 p-20 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400">
              No categories found. Click "Add Category" to begin.
            </div>
          )}
        </main>
      </div>

      {/* Modal matching your video UI */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">New Category</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required
                  onChange={e => setNewCategory({...newCategory, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Count</label>
                <input type="number" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required
                  onChange={e => setNewCategory({...newCategory, itemCount: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required
                  onChange={e => setNewCategory({...newCategory, imageUrl: e.target.value})} />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition mt-4">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;