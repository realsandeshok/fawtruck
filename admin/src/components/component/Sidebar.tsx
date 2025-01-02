import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Truck, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const menuItems = [
  { name: 'Banner', icon: Home, href: '/banner' },
  { name: 'Truck Models', icon: Truck, href: '/truckmodels' },
  { name: 'About Us', icon: Info, href: '/about' },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');

    // Show success toast
    toast.success('Logged out successfully!', {
      duration: 3000, // Toast will disappear after 3 seconds
    });

    // Redirect to login page
    navigate('/');
  };

  // Token validation
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Session expired. Please log in again.');
        navigate('/');
        return;
      }

      // Decode and validate token expiry if applicable
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        const isExpired = tokenData.exp * 1000 < Date.now();
        if (isExpired) {
          localStorage.removeItem('token'); // Clear invalid token
          toast.error('Session expired. Please log in again.');
          navigate('/');
        }
      } catch (error) {
        console.error('Invalid token format:', error);
        localStorage.removeItem('token'); // Clear malformed token
        toast.error('Session expired or invalid. Please log in again.');
        navigate('/');
      }
    };

    // Initial token check  
    checkToken();

    // Listen for manual token removal or updates
    const handleStorageChange = () => {
      checkToken();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate]);

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
        <div className="flex justify-center mt-4">
          <Button onClick={handleLogout} variant="destructive" className="w-full md:w-auto">
            Logout
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
