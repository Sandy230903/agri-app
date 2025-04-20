import React, { useEffect, useState } from 'react';
import { fetchOrders, updateOrderStatus } from '../services/api';

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Processing: 'bg-blue-100 text-blue-800',
  Delivered: 'bg-green-100 text-green-800',
};

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const fetchedOrders = await fetchOrders();
        if (fetchedOrders) {
          setOrders(fetchedOrders);
        } else {
          setError('No orders found.');
        }
      } catch (err) {
        setError('Failed to fetch orders.');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  const handleStatusChange = (id, status) => {
    updateOrderStatus(id, status).then(() => {
      setOrders(prev =>
        prev.map(o => (o._id === id ? { ...o, status } : o))
      );
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-green-800">📋 Admin Orders</h1>

      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}

      {orders.length === 0 && !error && (
        <p className="text-gray-500 text-center">No orders yet.</p>
      )}

      {orders.length > 0 && (
        <div className="space-y-6">
          {orders.map(order => (
            <div
              key={order._id}
              className="border border-gray-300 p-6 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-medium">{order.buyerName}</h2>
                  <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700">Shipping Address:</h3>
                <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
              </div>

              <div className="mt-4">
                {order.status !== 'Delivered' && (
                  <>
                    <label className="text-sm font-medium mr-2 text-gray-700">Update Status:</label>
                    <select
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      value={order.status}
                      className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {order.status === 'Pending' && (
                        <>
                          <option value=""></option>
                          <option value="Processing">Processing</option>
                          <option value="Delivered">Delivered</option>
                        </>
                      )}
                      {order.status === 'Processing' && (
                        <>
                          <option value=""></option>
                          <option value="Pending">Pending</option>
                          <option value="Delivered">Delivered</option>
                        </>
                      )}
                    </select>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
