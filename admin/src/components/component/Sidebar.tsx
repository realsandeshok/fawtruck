import { Link, useLocation } from 'react-router-dom';
import { Home, Truck, Info } from 'lucide-react';

const menuItems = [
  { name: 'Banner', icon: Home, href: '/banner' },
  { name: 'Truck Models', icon: Truck, href: '/truckmodels' },
  { name: 'About Us', icon: Info, href: '/about' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col w-64 bg-gray-800 h-screen">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <span className="text-white text-2xl font-semibold">Admin Panel</span>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2 py-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link to={item.href}>
                <span
                  className={`flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 ${
                    location.pathname === item.href ? 'bg-gray-700' : ''
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
