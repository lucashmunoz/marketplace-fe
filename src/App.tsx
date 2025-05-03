import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import { paths } from "./paths";
import Order from "./pages/Order";
import Stocks from "./pages/Stocks";
import Purchases from "./pages/Purchases";
import "react-loading-skeleton/dist/skeleton.css";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="flex w-full flex-col gap-6 p-6">
        <div className="flex w-full justify-center">
          <Routes>
            <Route path={paths.order} element={<Order />} />
            <Route path={paths.stocks} element={<Stocks />} />
            <Route path={paths.purchases} element={<Purchases />} />
            <Route path="*" element={<Navigate to={paths.order} replace />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
};

export default App;
