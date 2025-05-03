import { useState } from "react";

interface Purchase {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  email: string;
  date: string; // ISO string
}

const initialPurchases: Array<Purchase> = [
  {
    id: "1",
    productName: "Café",
    quantity: 2,
    unitPrice: 1200,
    totalPrice: 2400,
    email: "juan@example.com",
    date: "2025-05-03T10:30:00"
  },
  {
    id: "2",
    productName: "Té",
    quantity: 1,
    unitPrice: 800,
    totalPrice: 800,
    email: "maria@example.com",
    date: "2025-05-03T11:00:00"
  }
];

const Purchases = () => {
  const [purchases] = useState(initialPurchases);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <h2 className="w-full text-lg font-semibold">Compras realizadas</h2>

      <div className="flex w-full max-w-3xl flex-col gap-4">
        {purchases.map((purchase) => (
          <div
            key={purchase.id}
            className="flex flex-col justify-between gap-4 rounded-md border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center"
          >
            <div className="space-y-1">
              <div className="text-lg font-semibold text-gray-900">
                {purchase.productName}
              </div>
              <div className="text-sm text-gray-700">
                <span className="font-medium">Cantidad:</span> {purchase.quantity}
              </div>
              <div className="text-sm text-gray-700">
                <span className="font-medium">Precio unitario:</span> $
                {purchase.unitPrice}
              </div>
              <div className="text-sm text-gray-700">
                <span className="font-medium">Total:</span> ${purchase.totalPrice}
              </div>
            </div>
            <div className="space-y-1 text-right text-sm text-gray-600">
              <div>
                <span className="font-medium">Email:</span> {purchase.email}
              </div>
              <div>
                <span className="font-medium">Fecha:</span>{" "}
                {new Date(purchase.date).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Purchases;
