import { useFinance } from "../context/FinanceContext";

export default function Balance() {
  const { transactions } = useFinance();

  const total = transactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="card">
      <h2>Saldo</h2>
      <h1>{total} zł</h1>
    </div>
  );
}