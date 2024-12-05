import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import APIService from "../components/APIService";

const Orders = () => {
  const { user } = useUser();
  const { has } = useAuth();
  const isAdmin = has({ role: "org:admin" });

  const [orders, setOrders] = useState([]);

  // Fetch Orders Data
  const getOrdersData = async () => {
    try {
      const data = await APIService.getOrders(user.primaryEmailAddress.emailAddress, isAdmin);
      console.log(data);
      setOrders(data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getOrdersData(); // Call the function on component mount
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Client ID
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Creation Date
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order Status
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quote ID
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Price
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Work Start Date
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Work End Date
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.order_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.order_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.client_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.creation_date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.order_status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.quote_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.total_price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.work_start_date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.work_end_date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center px-6 py-4 text-sm text-gray-500">
                No Orders Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
