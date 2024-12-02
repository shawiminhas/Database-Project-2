import React, { useState } from 'react';

const ShowCurrentQuotesTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 py-4">No quotes available.</p>;
  }

  const renderCellContent = (value) => {
    const [showFullText, setShowFullText] = useState(false);
    const maxLength = 30;

    if (typeof value === 'string' && value.length > maxLength) {
      return (
        <div>
          {showFullText ? value : `${value.substring(0, maxLength)}...`}
          <button
            onClick={() => setShowFullText(!showFullText)}
            className="text-blue-500 text-sm ml-2 hover:underline"
          >
            {showFullText ? 'Show Less' : 'Show More'}
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
                {key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex} className={rowIndex % 2 === 0 ? '' : 'bg-gray-100'}>
              {Object.values(row).map((value, columnIndex) => (
                <td key={`${rowIndex}-${columnIndex}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {renderCellContent(value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowCurrentQuotesTable;
