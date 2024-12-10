'use client'
import React, { useState } from "react";
import moment from "moment";

interface Transaction {
  type: "add" | "subtract";
  amount: number;
  date: string;
}

const FinanceCalculator: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goal, setGoal] = useState<number>(20000);
  const [isEditing, setIsEditing] = useState<number | null>(null); // Tracks which transaction is being edited
  const [editValue, setEditValue] = useState<string>("");

  const handleAdd = (): void => {
    const amount = parseFloat(inputValue);
    if (!isNaN(amount)) {
      const newBalance = balance + amount;
      setBalance(newBalance);
      setTransactions([
        ...transactions,
        { type: "add", amount, date: moment().format("DD MMM YYYY") },
      ]);
      setInputValue("");
    }
  };

  const handleSubtract = (): void => {
    const amount = parseFloat(inputValue);
    if (!isNaN(amount)) {
      const newBalance = balance - amount;
      setBalance(newBalance);
      setTransactions([
        ...transactions,
        { type: "subtract", amount, date: moment().format("DD MMM YYYY") },
      ]);
      setInputValue("");
    }
  };

  const handleDelete = (index: number): void => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    const newBalance = updatedTransactions.reduce((acc, transaction) => {
      return transaction.type === "add"
        ? acc + transaction.amount
        : acc - transaction.amount;
    }, 0);

    setTransactions(updatedTransactions);
    setBalance(newBalance);
  };

  const handleEdit = (index: number): void => {
    const transaction = transactions[index];
    setIsEditing(index);
    setEditValue(transaction.amount.toString());
  };

  const handleSaveEdit = (index: number): void => {
    const updatedTransactions = [...transactions];
    const originalTransaction = updatedTransactions[index];
    const updatedAmount = parseFloat(editValue);

    if (!isNaN(updatedAmount)) {
      // Update the transaction
      updatedTransactions[index] = { ...originalTransaction, amount: updatedAmount };

      // Recalculate balance
      const newBalance = updatedTransactions.reduce((acc, transaction) => {
        return transaction.type === "add"
          ? acc + transaction.amount
          : acc - transaction.amount;
      }, 0);

      setTransactions(updatedTransactions);
      setBalance(newBalance);
      setIsEditing(null); // Exit edit mode
    }
  };

  const handleCancelEdit = (): void => {
    setIsEditing(null);
    setEditValue("");
  };

  return (
    <div className="p-6 bg-purple-50 border border-gray-300 rounded-md max-w-sm mx-auto">
      <header className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Finance</h2>
      </header>

      <div className="mt-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter amount"
          className="text-4xl font-bold text-gray-400 w-full focus:outline-none bg-transparent text-center"
        />
        <p className="text-sm text-gray-500">Today</p>
      </div>

      <div className="mt-4 flex gap-4">
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Plus
        </button>
        <button
          onClick={handleSubtract}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Minus
        </button>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Milestone</span>
          <span>Milestone 1</span>
        </div>
        <div className="mt-2">
          <h3 className="text-2xl font-bold">
            {balance.toFixed(2)} <span className="text-sm">INR</span>
          </h3>
          <div className="w-full bg-gray-200 rounded mt-2 h-2 relative">
            <div
              className="bg-black h-2 rounded"
              style={{ width: `${(balance / goal) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>0</span>
            <span>{goal}</span>
          </div>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {transactions.map((transaction, index) => (
          <li key={index} className="flex justify-between items-center text-sm">
            {isEditing === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-20 border border-gray-300 rounded p-1"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveEdit(index)}
                    className="text-green-500 hover:text-green-700"
                  >
                    ✔️
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="text-red-500 hover:text-red-700"
                  >
                    ❌
                  </button>
                </div>
              </>
            ) : (
              <>
                <span
                  className={`${
                    transaction.type === "add" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {transaction.type === "add" ? "+ " : "- "}
                  {transaction.amount.toFixed(2)}
                </span>
                <span>{transaction.date}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    🗑️
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinanceCalculator;
