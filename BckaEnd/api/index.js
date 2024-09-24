
const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

let items = [
  { id: 1, name: 'Item One' },
  { id: 2, name: 'Item Two' },
];


app.get('/items', (req, res) => {
  res.send(items);  
});

app.get('/items/:id', (req,res)=>{
const item = items.find(c => c.id === parseInt(req.params.id));
if(!item) res.status(404).send('id not found');
res.send(item);

})

app.post('/items/',(req, res)=>{
  const schema =  Joi.object({
    name: Joi.string().min(3).required()
  });

  const {error} = schema.validate(req.body);

  if(error){
    return res.status(400).send(error.details[0].message);
   
  }
    const item ={
    id: items.length+1,
    name:req.body.name,
  
  }
  items.push(item);
  res.send(items);
})
/*
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
*/
// 3. Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
