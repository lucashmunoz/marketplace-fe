import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Product } from "../types/products";
import api, { endpoints } from "../api";

const LoadingSkeleton = () => {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex flex-row justify-between bg-white p-4 shadow">
          <Skeleton height={20} width={150} />
          <Skeleton height={16} width={80} style={{ marginTop: 8 }} />
        </div>
      ))}
    </div>
  );
};

const Stocks = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const response = await api.get<Product[]>(endpoints.items);
      setProducts(response?.data);

      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold text-gray-800">Stocks</h2>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="flex w-full max-w-xl flex-col gap-4">
          {products.map((product) => (
            <div
              key={product.itemId}
              className="flex w-full items-center justify-between bg-white p-4 shadow"
            >
              <div className="font-medium">{product.description}</div>
              <div className="text-sm text-gray-700">Stock: {product.quantity}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Stocks;
