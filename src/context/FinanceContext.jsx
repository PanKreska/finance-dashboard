import { createContext, useContext, useState, useEffect } from "react";

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("transactions");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    const addTransaction = (tx) => {
        setTransactions((prev) => [...prev, { ...tx, id: Date.now() }]);
    };

    const deleteTransaction = (id) => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <FinanceContext.Provider
            value={{ transactions, addTransaction, deleteTransaction }}
        >
            {children}
        </FinanceContext.Provider>
    );
}

export function useFinance() {
    return useContext(FinanceContext);
}
