// Import the Express module
const express = require('express');
const app = express();

// Middleware to parse JSON bodies in requests
app.use(express.json());

// In-memory storage to hold some data (for demonstration)
let items = [
  { id: 1, name: 'Item One' },
  { id: 2, name: 'Item Two' }
];

// 1. GET endpoint: Retrieve all items
app.get('/items', (req, res) => {
  res.json(items);  // Respond with all items as JSON
});

// 2. POST endpoint: Add a new item
app.post('/items', (req, res) => {
  const newItem = req.body;  // Extract new item from request body

  // Validation: Ensure the item has a 'name'
  if (!newItem.name) {
    return res.status(400).json({ error: 'Item name is required' });
  }

  // Create a new item object with an ID
  newItem.id = items.length + 1;
  
  // Add the new item to our 'items' array
  items.push(newItem);

  // Respond with a success message and the new item
  res.status(201).json({
    message: 'Item added successfully',
    item: newItem
  });
});

// 3. Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
