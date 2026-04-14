import { useFinance } from "../context/FinanceContext";

export default function TransactionList() {
  const { transactions, deleteTransaction } = useFinance();

  return (
    <div className="card">
      <h3>Historia</h3>

      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.text} — {t.amount} zł

            <button onClick={() => deleteTransaction(t.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}