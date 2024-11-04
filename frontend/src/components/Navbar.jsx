import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
    { name: "Dashboard", href: "/user-dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const cartItems = useSelector(state => state.cart.cartItems);
    const { currentUser, logoutUser } = useAuth();
    const token = localStorage.getItem('token');

    const handleLogOut = () => {
        logoutUser();
    };

    return (
        <header className="bg-white shadow-sm">
            <nav className="max-w-screen-2xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Left side */}
                    <div className="flex items-center gap-6">
                        <Link to="/" className="hover:text-primary transition-colors">
                            <HiMiniBars3CenterLeft className="w-6 h-6" />
                        </Link>

                        {/* Search input */}
                        <div className="relative hidden sm:block">
                            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input 
                                type="text" 
                                placeholder="Search here"
                                className="w-72 py-2 pl-10 pr-4 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        {/* User Profile/Login */}
                        <div className="relative">
                            {currentUser ? (
                                <div>
                                    <button 
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex items-center focus:outline-none"
                                    >
                                        <img 
                                            src={currentUser.photoURL} 
                                            alt="User Avatar" 
                                            className="w-8 h-8 rounded-full ring-2 ring-primary"
                                        />
                                    </button>
                                    
                                    {/* Dropdown Menu */}
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                            <button
                                                onClick={handleLogOut}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : token ? (
                                <Link 
                                    to="/dashboard" 
                                    className="text-primary border-b-2 border-primary px-2 py-1 hover:opacity-80 transition-opacity"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link 
                                    to="/login" 
                                    className="hover:text-primary transition-colors"
                                >
                                    <HiOutlineUser className="w-6 h-6" />
                                </Link>
                            )}
                        </div>

                        {/* Wishlist */}
                        <button className="hidden sm:flex hover:text-primary transition-colors">
                            <HiOutlineHeart className="w-6 h-6" />
                        </button>

                        {/* Cart */}
                        <Link 
                            to="/cart" 
                            className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            <HiOutlineShoppingCart className="w-5 h-5" />
                            <span className="text-sm font-medium">
                                {cartItems.length || 0}
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;