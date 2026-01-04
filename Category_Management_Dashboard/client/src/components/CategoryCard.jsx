import { Edit2 } from 'lucide-react';

const CategoryCard = ({ category }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group">
    <div className="relative h-48">
      <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
      <div className="absolute top-3 right-3">
        <button className="p-2 bg-white/90 backdrop-blur rounded-full shadow-sm hover:bg-indigo-600 hover:text-white transition">
          <Edit2 size={16} />
        </button>
      </div>
    </div>
    <div className="p-5">
      <h3 className="text-lg font-bold text-gray-800">{category.name}</h3>
      <p className="text-gray-500 text-sm mt-1">{category.itemCount} Items</p>
    </div>
  </div>
);

export default CategoryCard;