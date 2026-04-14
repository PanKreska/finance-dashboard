import { Pie } from "react-chartjs-2";
import { useFinance } from "../context/FinanceContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart() {
    const { transactions } = useFinance();

    const income = transactions
        .filter((t) => t.amount > 0)
        .reduce((acc, t) => acc + t.amount, 0);

    const expense = transactions
        .filter((t) => t.amount < 0)
        .reduce((acc, t) => acc + t.amount, 0);

    const totalAbs = income + Math.abs(expense);

    const incomePercent = totalAbs ? ((income / totalAbs) * 100).toFixed(1) : 0;

    const expensePercent = totalAbs
        ? ((Math.abs(expense) / totalAbs) * 100).toFixed(1)
        : 0;

    const data = {
        labels: ["Przychody", "Wydatki"],
        datasets: [
            {
                data: [income, Math.abs(expense)],
                backgroundColor: ["#22c55e", "#ef4444"],
                borderWidth: 0,
                hoverOffset: 10,
            },
        ],
    };

    const options = {
        cutout: "70%",
        plugins: {
            legend: {
                position: "bottom",
                align: "start",
                labels: {
                    color: "white",
                    padding: 20,
                    font: { size: 14 },
                    usePointStyle: true,
                    pointStyle: "circle",
                    generateLabels: (chart) => {
                        const data = chart.data;

                        return data.labels.map((label, i) => {
                            const value = data.datasets[0].data[i];
                            const percent = totalAbs
                                ? ((value / totalAbs) * 100).toFixed(1)
                                : 0;

                            return {
                                text: `${label}: ${percent}%`,
                                fillStyle: data.datasets[0].backgroundColor[i],
                                strokeStyle:
                                    data.datasets[0].backgroundColor[i],
                                fontColor: "white",
                                color: "white",
                            };
                        });
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.raw;
                        const percent = totalAbs
                            ? ((value / totalAbs) * 100).toFixed(1)
                            : 0;

                        return context.label + ": " + percent + "%";
                    },
                },
            },
        },
    };

    return (
        <div className="card chart-card">
            <h3>Podział finansów</h3>

            <div className="chart-wrapper">
                <Pie data={data} options={options} />

                {/* Środek pączka */}
                <div className="chart-center">
                    <strong>{incomePercent}%</strong>
                    <span>przychody</span>
                </div>
            </div>
        </div>
    );
}
