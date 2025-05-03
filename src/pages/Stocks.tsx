import { useState } from "react";

interface Product {
  id: string;
  name: string;
  stock: number;
}

const initialProducts: Array<Product> = [
  { id: "coffee", name: "Café", stock: 10 },
  { id: "tea", name: "Té", stock: 5 },
  { id: "juice", name: "Jugo", stock: 8 }
];

const Stocks = () => {
  const [products] = useState(initialProducts);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <h2 className="w-full text-lg font-semibold">Stocks</h2>
      <div className="flex w-full max-w-xl flex-col gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex w-full items-center justify-between bg-white p-4 shadow"
          >
            <div className="font-medium">{product.name}</div>
            <div className="text-sm text-gray-700">Stock: {product.stock}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stocks;
