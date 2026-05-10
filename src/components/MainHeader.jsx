import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import toast, { Toaster } from "react-hot-toast";

export default function MainHeader({ setUserInfo, currentUser, setCurrentUser }) {

  const handleLogout = () => {
    setUserInfo((prev => {
      return prev.map(u => {
        if (u.username === currentUser.username) {
          return { ...u, isloggedIn: false };
        }
        return u;
      });
    }));
    toast.success("Logged out successfully!");
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <header className="w-full bg-white/15 backdrop-blur-2xl text-white rounded-b-lg shadow-md">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container flex items-center justify-between">
        <img
          className="w-20 h-auto object-cover"
          src={logo}
          alt="InstaPay Logo"
        />
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-purple-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-purple-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-purple-300">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {currentUser ? (
          <button
            onClick={handleLogout}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Logout
          </button>
        ) : (
          <div className="flex space-x-4">
            <Link
              to="/Login"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Login
            </Link>
            <Link
              to="/Register"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
