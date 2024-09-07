import React , { useState } from 'react';
//import Greeting from './Side';
import MessageArea from './MessageArea';
import InputArea from './InputArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import fatwaLogo from './assets/fatwaLogo.png';
import '../index.css';

// Simulated JSON responses
const responses = {
  "hello": "Hello! How can I help you today?",
  "how are you": "I'm just a bot, but I'm functioning as expected :)!",
  "default": "I'm sorry, I didn't understand that. Can you please rephrase?"
};

function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sendMessage = (message) => {
    if (message.trim() === '') return; // Do not send empty messages

    // Add the user's message to the messages state, it will create new list anspread the message data in it.
    setMessages([...messages, { text: message, sender: 'user' }]);

    // Simulate a response based on the user's message
    const response = responses[message.toLowerCase()] || responses["default"];
    setMessages(prevMessages => [...prevMessages, { text: response, sender: 'bot' }]);
  };

  return (
    <>
      <div className='flex h-screen'>
      {isSidebarOpen && (
        <div className="sidebar w-1/4 bg-[#fbe38c] shadow-md text-white p-4">
          <img src={fatwaLogo} alt="شعار الدردشة" className="logo mb-4 h-40 w-70 " />
        </div>
      )}

      <div className={`flex-1 flex flex-col ${isSidebarOpen ? 'ml-1/4' : ''}`}>
          {/* Toggle Button (Hamburger Icon) */}
          <div
            onClick={toggleSidebar}
            className="p-4 cursor-pointer absolute top-4 left-4 z-10"
          >
            <FontAwesomeIcon
              icon={isSidebarOpen ? faBars : faBars}
              className="text-xl shadow-lg bg-[#fbe38c]"
            />
          </div>

          {/* Message Area */}
          <div className="messageArea flex-1  p-4 overflow-y-auto">
          {/* Messages will be displayed here */}
          <MessageArea messages={messages} />
        </div>


          {/* Input Area */}
          
          <InputArea sendMessage={sendMessage} />


        </div>
      </div>


    </>
  );
}

export default App;
