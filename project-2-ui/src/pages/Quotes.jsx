import React from "react";
import CreateQuoteForm from "../components/CreateQuoteForm";
import { useState, useEffect } from "react";
import APIService from "../components/APIService";
import { useUser, useAuth } from "@clerk/clerk-react";
import ShowCurrentQuotesTable from "../components/ShowCurrentQuotesTable";

const Quotes = () => {
  const { user } = useUser();
  const { has } = useAuth();
  const [response, setResponse] = useState([]);
  const [showNewQuote, setShowNewQuote] = useState(false);
  const [showCurrentQuote, setShowCurrentQuote] = useState(false);

  const isAdmin = has({ role: "org:admin" });

  useEffect(() => {
    dataFunction();
  }, []);

  const handleShowNewQuote = () => {
    setShowNewQuote((prevState) => !prevState);
    setShowCurrentQuote(false);
  };

  const handleShowCurrentQuote = () => {
    setShowCurrentQuote((prevState) => !prevState);
    setShowNewQuote(false);
  };

  const dataFunction = async () => {
    const data = await APIService.getQuoteRequests(
      user.primaryEmailAddress.emailAddress,
      isAdmin ? "True" : "False"
    );
    setResponse(data);
  };

  return (
    <>
      <div className="flex justify-center items-center bg-gray-300">
        <button
          onClick={handleShowNewQuote}
          type="button"
          className="border text-white bg-neutral-600 p-2 px-4 font-semibold rounded-md hover:scale-105 transition-all hover:shadow-md m-5"
        >
          Create New Quote
        </button>
        <button
          onClick={handleShowCurrentQuote}
          type="button"
          className="border text-white bg-neutral-600 p-2 px-4 font-semibold rounded-md hover:scale-105 transition-all hover:shadow-md"
        >
          Show Current Quotes
        </button>
      </div>

      {showNewQuote && <CreateQuoteForm />}
      {showCurrentQuote && response.length > 0 && (
        <ShowCurrentQuotesTable
          data={response}
          setDataFunction={dataFunction}
        />
      )}
    </>
  );
};

export default Quotes;
