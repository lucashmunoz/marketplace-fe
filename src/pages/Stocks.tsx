import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
// import api, { endpoints } from "../api";

interface Product {
  item_id: string;
  description: string;
  quantity: number;
  price: number;
}

const mockedItems: Product[] = [
  {
    item_id: "01b1beb5-ba56-4dc3-be5c-f024ccc256eb",
    description: "MacBook",
    quantity: 10,
    price: 999.99
  },
  {
    item_id: "cc695cb3-27c8-4906-9399-d8c6c231f0ae",
    description: "Samsung S24 Ultra",
    quantity: 5,
    price: 1200.0
  },
  {
    item_id: "16b87ed4-584d-4ede-bd23-d9bcfd0e5364",
    description: "Smartwatch",
    quantity: 20,
    price: 200.5
  }
];

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
      // const response = await api.get<Product[]>(endpoints.items);

      const response = await new Promise<Product[]>((resolve) => {
        setTimeout(() => {
          resolve(mockedItems);
        }, 1000);
      });

      setProducts(response);
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
              key={product.item_id}
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
