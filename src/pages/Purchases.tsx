import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Purchase } from "../types/purchases";
import api, { endpoints } from "../api";

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

      const response = await api.get<Purchase[]>(endpoints.purchases);
      setPurchases(response.data);

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
                  {purchase.unitPrice}
                </div>
                <div className="text-sm text-gray-700">
                  <span className="font-medium">Precio total:</span> $
                  {purchase.totalPrice}
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
