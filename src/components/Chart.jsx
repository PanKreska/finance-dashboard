import { Pie } from "react-chartjs-2";
import { useFinance } from "../context/FinanceContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart() {
  const { transactions } = useFinance();

  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const data = {
    labels: ["Przychody", "Wydatki"],
    datasets: [
      {
        data: [income, Math.abs(expense)],
      },
    ],
  };

  return (
    <div className="card">
      <h3>Podział finansów</h3>
      <Pie data={data} />
    </div>
  );
}