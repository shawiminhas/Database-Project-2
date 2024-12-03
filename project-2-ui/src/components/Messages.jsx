import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

const Messages = ({
  showMessages,
  setShowMessages,
  messages,
  postMessage,
  id,
}) => {
  const { has } = useAuth();
  const admin = has({ role: "org:admin" });

  return (
    <div>
      {showMessages && (
        <div className="absolute ml-auto mr-auto left-0 right-0 text-center w-1/3 bg-white rounded-md shadow-md p-4 h-screen flex flex-col">
          <div className="flex justify-end">
            <button
              onClick={() => setShowMessages(!showMessages)}
              className="bg-red-600 text-white rounded-full px-3 py-1 hover:bg-red-600 transition mb-4"
            >
              X
            </button>
          </div>
          <div className="flex-grow overflow-y-auto space-y-4">
            {messages.map((message, index) => (
              <Message
                key={index}
                isAdmin={message.is_admin}
                message={message.message}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4">
            <SubmitButton is_admin={admin} postMessage={postMessage} id={id} />
          </div>
        </div>
      )}
    </div>
  );
};

const Message = ({ isAdmin, message }) => {
  return (
    <div className={`flex ${isAdmin ? "justify-start" : "justify-end"}`}>
      <div
        className={`${
          isAdmin ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        } p-3 rounded-lg w-fit max-w-xs shadow-md`}
      >
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

const SubmitButton = ({ is_admin, id, postMessage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() === "") {
      alert("Message cannot be empty");
      return;
    }
    postMessage(id, message, is_admin);

    setMessage("");
  };

  return (
    <div className="flex items-center gap-2 flex-grow">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="p-3 bg-gray-100 w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSendMessage}
        className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
      >
        Send
      </button>
    </div>
  );
};
export default Messages;
