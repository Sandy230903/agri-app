import React from 'react';
import { useAppContext } from '../context/AppContext';
import OrderForm from '../components/OrderForm';

const HomePage = () => {
  const { products } = useAppContext();

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">📦 Product Catalogue</h1>

        {/* Product List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <p className="text-xl font-semibold text-gray-600 text-center col-span-full">No products available at the moment. Please check back later!</p>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="flex flex-col items-center space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
                  <span className="text-lg font-medium text-gray-600">₹{product.price} {product.priceUnit}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Form Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-green-800 mb-6 text-center">Place an Order</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-medium text-gray-700 mb-4">To place an order, please fill out the details below:</p>
            <OrderForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
