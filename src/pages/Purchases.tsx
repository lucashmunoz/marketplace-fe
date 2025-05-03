import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Purchase } from "../types/purchases";

const mockedPurchases: Array<Purchase> = [
  {
    id: "be3bf719-b652-454a-82e1-b5341769d17c",
    item_id: "59bc398f-85ed-44b3-8e31-0289bc1c75c1",
    quantity: 1,
    email: "example@domain.com",
    unit_price: 1000.0,
    total_price: 1000.0,
    date: "2025-05-03T13:28:22.185820800",
    description: "TV 4K OLED"
  },
  {
    id: "f0733bd3-323e-487e-a8c8-4c1cde8577cd",
    item_id: "05ceeccd-26e4-4b9e-bf08-aaf2374b75e4",
    quantity: 2,
    email: "example@domain.com",
    unit_price: 500.0,
    total_price: 1000.0,
    date: "2025-05-03T13:28:22.185820800",
    description: "PlayStation 5 pro"
  }
];

const PurchasesSkeleton = () => (
  <div className="flex w-full max-w-3xl flex-col gap-4">
    {[...Array(2)].map((_, i) => (
      <div
        key={i}
        className="flex flex-col justify-between gap-4 rounded-md border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center"
      >
        <div className="w-full space-y-2">
          <Skeleton height={20} width={100} />
          <Skeleton height={16} width={140} />
          <Skeleton height={16} width={180} />
          <Skeleton height={16} width={120} />
        </div>
        <div className="w-full space-y-2 text-right sm:w-auto">
          <Skeleton height={16} width={200} />
          <Skeleton height={16} width={180} />
        </div>
      </div>
    ))}
  </div>
);

const Purchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      setLoading(true);
      const response = await new Promise<Purchase[]>((resolve) => {
        setTimeout(() => {
          resolve(mockedPurchases);
        }, 1000);
      });

      setPurchases(response);
      setLoading(false);
    };

    fetchPurchases();
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <h2 className="w-full text-lg font-semibold">Compras realizadas</h2>

      {loading ? (
        <PurchasesSkeleton />
      ) : (
        <div className="flex w-full max-w-3xl flex-col gap-4">
          {purchases.map((purchase) => (
            <div
              key={purchase.id}
              className="flex flex-col justify-between gap-4 rounded-md border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center"
            >
              <div className="space-y-1">
                <div className="text-lg font-semibold text-gray-900">
                  {purchase.description}
                </div>
                <div className="text-sm text-gray-700">
                  <span className="font-medium">Cantidad:</span> {purchase.quantity}
                </div>
                <div className="text-sm text-gray-700">
                  <span className="font-medium">Precio unitario:</span> $
                  {purchase.unit_price}
                </div>
                <div className="text-sm text-gray-700">
                  <span className="font-medium">Precio total:</span> $
                  {purchase.total_price}
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
      )}
    </div>
  );
};

export default Purchases;
