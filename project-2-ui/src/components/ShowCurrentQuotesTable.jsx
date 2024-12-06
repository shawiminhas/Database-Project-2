import React, { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import APIService from "./APIService";
import Messages from "./Messages";
import { useNavigate } from "react-router-dom";

const ShowCurrentQuotesTable = ({ data, setDataFunction }) => {
  const navigate = useNavigate();
  console.log(data);
  const { has } = useAuth();
  const isAdmin = has({ role: "org:admin" });
  const [showMessages, setShowMessages] = useState(false);
  const [messages, setMessages] = useState([]);
  const [id, setId] = useState(null);

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 py-4">No quotes available.</p>;
  }

  const onAdminUpdateStatus = async (id, orderStatus) => {
    try {
      const response = await APIService.updateRequestStatus(id.id, orderStatus);
      console.log(response);
      setDataFunction();
      if (orderStatus === "Accepted") {
        navigate("/addOrderInformation");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getMessages = async (id) => {
    const newMessages = await APIService.getAllMessages(id);
    setMessages(newMessages);
    setShowMessages(!showMessages);
    setId(id);
  };

  const postMessage = async (id, message, isAdmin) => {
    await APIService.postMessage(id, isAdmin, message);
    const newMessages = await APIService.getAllMessages(id);
    setMessages(newMessages);
  };

  const clientWithdraw = async (id) => {
    try {
      await APIService.withdrawOrder(id);
      setDataFunction();
    } catch (error) {
      console.log("Error withdrawing order:", e);
    }
  };

  const AdminButton = (orderId) => {
    return (
      <div className="space-x-2 flex flex-shrink">
        <button
          onClick={() => onAdminUpdateStatus(orderId, "Accepted")}
          className="p-2 text-white rounded-lg bg-green-500 hover:bg-green-600"
        >
          Accept
        </button>
        <button
          onClick={() => onAdminUpdateStatus(orderId, "Negotiating")}
          className="p-2 text-white rounded-lg bg-gray-500 hover:bg-gray-600"
        >
          Negotiate
        </button>
        <button
          onClick={() => onAdminUpdateStatus(orderId, "Rejected")}
          className="p-2 text-white rounded-lg bg-red-500 hover:bg-red-600"
        >
          Reject
        </button>
      </div>
    );
  };

  const UserButton = (id) => {
    return (
      <div className="space-x-2 flex flex-shrink">
        <button onClick={() => clientWithdraw(id)} className="p-2 text-white rounded-lg bg-gray-500 hover:bg-gray-600">
          Withdraw
        </button>
      </div>
    );
  };

  const renderCellContent = (value, id, messages) => {
    const [showFullText, setShowFullText] = useState(false);
    const maxLength = 30;

    if (typeof value === "string" && value == messages) {
      return (
        <div className="text-wrap">
          {showFullText ? value : `${value.substring(0, maxLength)}...`}
          <button onClick={() => getMessages(id)} className="text-blue-500 text-sm ml-2 hover:underline">
            {showFullText ? "Show Less" : "Show More"}
          </button>
        </div>
      );
    }
    return value;
  };

  return (
    <div className="overflow-x-auto">
      <Messages
        showMessages={showMessages}
        setShowMessages={setShowMessages}
        messages={messages}
        postMessage={postMessage}
        id={id}
      />
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th
                key={key}
                className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex} className={rowIndex % 2 === 0 ? "" : "bg-gray-100"}>
              {Object.values(row).map((value, columnIndex) => (
                <td key={`${rowIndex}-${columnIndex}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {renderCellContent(value, row.id, row.messages)}
                </td>
              ))}
              <td>
                {isAdmin
                  ? row.status !== "Completed" &&
                    row.status !== "Accepted" &&
                    row.status !== "Rejected" && <AdminButton id={row.id} />
                  : row.status === "Pending" && <UserButton id={row.id} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowCurrentQuotesTable;
