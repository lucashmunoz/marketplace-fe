import OrderForm from "./components/OrderForm";

const App = () => {
  return (
    <main className="flex w-full flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold text-black">Marketplace FE</h1>
      <div className="flex w-full justify-center">
        <OrderForm />
      </div>
    </main>
  );
};

export default App;
