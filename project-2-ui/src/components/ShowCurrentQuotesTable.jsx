import React, { useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import APIService from "./APIService";

const ShowCurrentQuotesTable = ({ data, setDataFunction }) => {
  const { has } = useAuth();
  const isAdmin = has({ role: "org:admin" });

  if (!data || data.length === 0) {
    return (
      <p className="text-center text-gray-500 py-4">No quotes available.</p>
    );
  }

  // const onAdminResponse = async(buttonType) = {

  // }

  const clientWithdraw = async (id) => {
    try {
      await APIService.withdrawOrder(id);
      setDataFunction();
    } catch (e) {
      console.log(e);
    }
  };

  const AdminButton = (orderId) => {
    return (
      <div className="space-x-2 flex flex-shrink">
        <button
          onClick={() => onAdminResponse("Accept")}
          className="p-2 text-white rounded-lg bg-green-500 hover:bg-green-600"
        >
          Accept
        </button>
        <button
          onClick={() => onAdminResponse("Negotiate")}
          className="p-2 text-white rounded-lg bg-gray-500 hover:bg-gray-600"
        >
          Negotiate
        </button>
        <button
          onClick={() => onAdminResponse("Reject")}
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
        <button
          onClick={() => clientWithdraw(id)}
          className="p-2 text-white rounded-lg bg-gray-500 hover:bg-gray-600"
        >
          Withdraw
        </button>
      </div>
    );
  };

  const renderCellContent = (value) => {
    const [showFullText, setShowFullText] = useState(false);
    const maxLength = 30;

    if (typeof value === "string" && value.length > maxLength) {
      return (
        <div className="text-wrap">
          {showFullText ? value : `${value.substring(0, maxLength)}...`}
          <button
            onClick={() => setShowFullText(!showFullText)}
            className="text-blue-500 text-sm ml-2 hover:underline"
          >
            {showFullText ? "Show Less" : "Show More"}
          </button>
        </div>
      );
    }
    return value;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th
                key={key}
                className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {key
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={row.id || rowIndex}
              className={rowIndex % 2 === 0 ? "" : "bg-gray-100"}
            >
              {Object.values(row).map((value, columnIndex) => (
                <td
                  key={`${rowIndex}-${columnIndex}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {renderCellContent(value)}
                </td>
              ))}
              <td>
                {isAdmin
                  ? row.status !== "Completed" &&
                    row.status !== "Accepted" && <AdminButton id={row.id} />
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
