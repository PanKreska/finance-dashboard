import Header from "./components/Header";
import Balance from "./components/Balance";
import AddTransaction from "./components/AddTransaction";
import { FinanceProvider } from "./context/FinanceContext";
import TransactionList from "./components/TransactionList";
import Chart from "./components/Chart";
function App() {
    return (
        <FinanceProvider>
            <div className="container">
                <Header />
                <main>
                    <Balance />
                    <Chart />
                    <AddTransaction />
                    <TransactionList />
                </main>
            </div>
        </FinanceProvider>
    );
}

export default App;
