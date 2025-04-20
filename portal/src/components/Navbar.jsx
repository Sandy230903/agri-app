import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState(null); // 'buyer' or 'admin' or null

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <nav className="bg-green-700 p-4 text-white flex justify-between items-center relative">
      <h1 className="text-xl font-bold">Agri Product Store</h1>

      <div className="flex gap-4">
        {/* Buyer Menu */}
        <div className="relative">
          <button
            onClick={() => toggleMenu('buyer')}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-800"
          >
            Buyer Menu
          </button>
          {openMenu === 'buyer' && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
              <Link
                to="/"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpenMenu(null)}
              >
                🏠 Product Catalogue
              </Link>
              <Link
                to="/track-order"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpenMenu(null)}
              >
                📦 Track Order
              </Link>
            </div>
          )}
        </div>

        {/* Admin Menu */}
        <div className="relative">
          <button
            onClick={() => toggleMenu('admin')}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-800"
          >
            Admin Menu
          </button>
          {openMenu === 'admin' && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
              <Link
                to="/admin/orders"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpenMenu(null)}
              >
                📋 Manage Orders
              </Link>
              <Link
                to="/admin/products"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpenMenu(null)}
              >
                🛒 Manage Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
