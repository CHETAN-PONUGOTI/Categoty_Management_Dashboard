import { LayoutDashboard, ShoppingCart, Tag, Users, BarChart3, Ticket, Mail, Settings, HelpCircle, RefreshCw } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400 hover:bg-indigo-50 hover:text-indigo-600'}`}>
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </div>
);

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#1e2640] p-4 flex flex-col text-white fixed left-0 top-0">
      <div className="flex items-center gap-2 px-2 mb-10">
        <div className="bg-orange-400 p-1.5 rounded-lg font-bold text-white text-xs">fastcart</div>
      </div>
      
      <div className="flex-1 space-y-1">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" />
        <SidebarItem icon={ShoppingCart} label="Orders" />
        <SidebarItem icon={Tag} label="Products" />
        <SidebarItem icon={Tag} label="Categories" active={true} />
        <SidebarItem icon={Users} label="Customers" />
        <SidebarItem icon={BarChart3} label="Reports" />
        <SidebarItem icon={Ticket} label="Coupons" />
        <SidebarItem icon={Mail} label="Inbox" />
      </div>

      <div className="pt-4 border-t border-gray-700 space-y-1">
        <p className="text-[10px] uppercase text-gray-500 px-4 mb-2">Other Information</p>
        <SidebarItem icon={HelpCircle} label="Knowledge Base" />
        <SidebarItem icon={RefreshCw} label="Product Updates" />
        <p className="text-[10px] uppercase text-gray-500 px-4 mb-2 mt-4">Settings</p>
        <SidebarItem icon={Settings} label="Personal Settings" />
        <SidebarItem icon={Settings} label="Global Settings" />
      </div>
    </div>
  );
};

export default Sidebar;