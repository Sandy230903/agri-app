import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { addProduct, deleteProduct, updateProduct } from '../services/api';

const AdminProducts = () => {
  const { products, setProducts } = useAppContext();
  const [newProduct, setNewProduct] = useState({ name: '', price: '', priceUnit: '' });

  const handleAdd = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.priceUnit) {
      alert('Please fill all fields!');
      return;
    }
    const added = await addProduct(newProduct);
    // Append the new product to the existing list of products
    setProducts([...products, added.data]);  
    setNewProduct({ name: '', price: '', priceUnit: '' }); // Clear the input fields
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter(p => p._id !== id));
  };

  const handleUpdate = async (id, price) => {
    const updated = await updateProduct(id, { price });
    setProducts(products.map(p => p._id === id ? updated : p));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-green-800">🛒 Manage Products</h1>

      {/* Add Product Section */}
      <div className="space-y-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Add New Product</h2>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Product Name"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Price Unit (e.g., kg, piece)"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={newProduct.priceUnit}
            onChange={(e) => setNewProduct({ ...newProduct, priceUnit: e.target.value })}
          />
          <button
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            onClick={handleAdd}
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Display Added Products Immediately */}
      {products.length > 0 && (
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product._id} className="border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <span className="text-lg font-semibold">₹{product.price} {product.priceUnit}</span>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-500 hover:text-red-600 font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
