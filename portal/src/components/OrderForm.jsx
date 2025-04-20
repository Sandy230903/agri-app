import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { placeOrder } from '../services/api';

const OrderForm = () => {
  const { products } = useAppContext();
  const [formData, setFormData] = useState({
    buyerName: '',
    buyerContact: '',
    deliveryAddress: '',
    items: [],
  });

  const handleQuantityChange = (productId, quantity) => {
    const updatedItems = formData.items.filter(item => item.productId !== productId);
    if (quantity > 0) updatedItems.push({ productId, quantity: Number(quantity) });
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await placeOrder(formData);
      alert('Order placed!');
    }catch(err){
      alert('Order failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Name" required className="input" onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })} />
      <input type="text" placeholder="Contact" required className="input" onChange={(e) => setFormData({ ...formData, buyerContact: e.target.value })} />
      <input type="text" placeholder="Address" required className="input" onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })} />
      <h3>Select Products:</h3>
      {products.map(p => (
        <div key={p._id}>
          <label>{p.name}:</label>
          <input type="number" min="0" className="input" onChange={(e) => handleQuantityChange(p._id, e.target.value)} />
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Order</button>
    </form>
  );
};

export default OrderForm;