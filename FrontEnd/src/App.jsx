import React , { useState } from 'react';
import Axios from 'axios'; // Correct import of axios
import MessageArea from './MessageArea';
import InputArea from './InputArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import fatwaLogo from './assets/fatwaLogo.png';
import '../index.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Send the user's message and get a response from the server
  const sendMessage = async (message) => {
    if (message.trim() === '') return; // Check if the message is empty

    // Add the user's message to the messages state
    setMessages([...messages, { text: message, sender: 'user' }]);

    try {
      // Make a POST request to the server
      const response = await Axios.post('http://localhost:3000/response', { phrase: message });
      console.log(response.data);
      // Add the server's response to the message list
      setMessages(prevMessages => [...prevMessages, { text: response.data.message, sender: 'bot' }]);
    } catch (error) {
      console.error('Error sending message:', error);

      // In case of an error, show an error message from the bot
      setMessages(prevMessages => [...prevMessages, { text: "Sorry, something went wrong.", sender: 'bot' }]);
    }
  };

  return (
    <>
      <div className='flex h-screen'>
        {isSidebarOpen && (
          <div className="sidebar w-1/4 bg-[#fbe38c] shadow-md text-white p-4">
            <img src={fatwaLogo} alt="شعار الدردشة" className="logo mb-4 h-40 w-70" />
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
          <div className="messageArea flex-1 p-4 overflow-y-auto">
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
