import { useState } from "react";
import { useFinance } from "../context/FinanceContext";

export default function AddTransaction() {
    const { addTransaction } = useFinance();

    const [text, setText] = useState("");
    const [amount, setAmount] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!text || !amount) return;

        addTransaction({
            text,
            amount: +amount,
        });

        setText("");
        setAmount("");
    };

    return (
        <div className="card">
            <h3>Dodaj transakcję</h3>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Opis"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Kwota (+/-)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <button type="submit">Dodaj</button>
            </form>
        </div>
    );
}
