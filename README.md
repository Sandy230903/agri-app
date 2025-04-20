This is an Assignment Project. A Fullstack application that facilitates Ordering of bulk Fruits/Vegetables. Following are the functionalities of this project:

1. Browse Vegetables/Fruits 
Display a product catalogue with basic details such as the name and price per unit. 
No stock tracking is required. 

2. Place Orders 
Allow buyers to request bulk orders by specifying the vegetable/fruit, quantity, and delivery details (name, contact information, delivery address). 
Save the order in the database with a unique identifier. 

3. Order Tracking 
Enable buyers to check the status of their placed orders, which should update as:
Pending: Order has been received. 
In Progress: Order is being processed for delivery. 
Delivered: Order has been delivered successfully. 

For Admin 
1. Order Management 
View all placed orders with buyer details, delivery address, and the list of requested items. 
Update the order status (Pending → In Progress → Delivered). 
2. Inventory Management 
Add, edit, or remove vegetables/fruits from the catalogue.
No stock tracking is implemented. Assuming all requested items are always available.

3. Database 
   Using MongoDB
    
4. Frontend 
Using React.js 
Built a clean, responsive, and user-friendly interface. 
Implemented basic pages for: 
Product catalogue. 
Order placement form. 
Order tracking view. 
Admin dashboard. 

5. Backend 
Implemented API routes using Express for: 
Fetching the product catalogue. 
Placing an order. 
Viewing and updating order statuses. 
Managing inventory (admin-only). 
Used appropriate HTTP methods (GET, POST, PUT, DELETE) for each API endpoint.

