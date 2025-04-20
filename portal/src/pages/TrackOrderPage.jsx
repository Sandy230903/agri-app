import React, { useState } from 'react';
import { fetchOrderById } from '../services/api';

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    if (!orderId) {
      setError('Please enter an order ID.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await fetchOrderById(orderId);
      if (data) {
        setOrder(data);
      } else {
        setError('Order not found.');
      }
    } catch (err) {
      setError('Error fetching order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-green-800 mb-8">Track Your Order</h1>

        {/* Order ID Input */}
        <div className="mb-6 flex items-center">
          <input
            type="text"
            placeholder="Enter Order ID"
            className="input w-full px-4 py-2 border border-gray-300 rounded-md"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded ml-4 hover:bg-blue-700 transition duration-300"
            onClick={handleFetch}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Track'}
          </button>
        </div>

        {/* Error and Order Status */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {order && !error && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-green-800 mb-4">Order Details</h2>
            <div className="border p-6 rounded-md bg-gray-100">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Product:</strong></p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {order.items.length === 0 ? (
            <p className="text-xl font-semibold text-gray-600 text-center col-span-full">No items available for this order.</p>
          ) : (
            order.items.map((item) => (
              <div
                key={item.productId}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="flex flex-col items-center space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-800">{item.productId.name}</h2>
                  <h2 className="text-2xl font-semibold text-gray-800">{item.quantity}</h2>
                  <h2 className="text-2xl font-semibold text-gray-800">{item.productId.price} {item.productId.priceUnit}</h2>
                </div>
              </div>
            ))
          )}
        </div>

              <p><strong>Buyer Name:</strong> {order.buyerName}</p>
              <p><strong>Buyer Address:</strong> {order.deliveryAddress}</p>
              <p><strong>Buyer Contact:</strong> {order.buyerContact}</p>
              <p><strong>Status:</strong> <span className={`font-semibold ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrderPage;
