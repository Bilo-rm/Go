import React from 'react';

function MessageArea({ messages }) {
  return (
    <div className="messageArea  w-5/6 mx-auto flex-1 p-4 overflow-y-auto ">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
          <span className={`inline-block mx-0 p-2 m-2 rounded ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
            {message.text}
          </span>
        </div>
      ))}
    </div>
  );
}

export default MessageArea;


///check the message widht