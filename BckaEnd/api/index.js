const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json()); 


const responses = {
  "hello": "Hello! How can I help you today?",
  "how are you": "I'm just a bot, but I'm functioning as expected :)!",
  "default": "I'm sorry, I didn't understand that. Can you please rephrase?"
};

//  handle user input
app.post('/response', (req, res) => {
  const phrase = req.body.phrase.toLowerCase();  // Get the phrase from request and convert to lowercase
  const response = responses[phrase] || responses["default"];  // Find the response or use default
  res.send({ message: response });  // Send the response as JSON
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});