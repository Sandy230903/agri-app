const API_BASE = 'http://localhost:3000/api';

export const fetchProducts = async () => {
    const res = await fetch(`${API_BASE}/products`);
    let products = await res.json();
    return products.data;
};

export const addProduct = async (product) => {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return res.json();
};

export const updateProduct = async (id, updates) => {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  return res.json();
};

export const deleteProduct = async (id) => {
  return fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
};

export const placeOrder = async (order) => {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
  let resCode = await res.json();
  if(resCode.code === 200){
    return resCode.code;
  }else{
    throw new Error('Order failed');
  }
};

export const fetchOrderById = async (id) => {
  const res = await fetch(`${API_BASE}/orders/${id}`);
  let order = await res.json();
  return order.data;
  
};

export const fetchOrders = async () => {
  const res = await fetch(`${API_BASE}/orders`);
  let orders = await res.json();
return orders.data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await fetch(`${API_BASE}/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return res.json();
};