import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'; // Send icon

function InputArea({sendMessage}) {

    //this section to store the input in inputValue 
    const [inputValue, setInputValue]=useState('');
    //by this function we will get any thing will be writting in input 
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };

      const handleSend = (event) => {
        event.preventDefault();
        sendMessage(inputValue);
        setInputValue('');
      };

  return (
    <form className="inputArea p-4 w-5/6 mx-auto flex items-center" onSubmit={handleSend}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your message..."
        className="w-full p-2 border rounded-xl"
      />
      <button
        type="submit"
        className="p-2.5 bg-[#015177] text-white rounded-r-xl flex items-center justify-center  "
      >
        <FontAwesomeIcon icon={faPaperPlane} className="text-xl  " />
      </button>
    </form>
  );
}

export default InputArea;

