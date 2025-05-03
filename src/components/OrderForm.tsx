import { useState } from "react";

interface Product {
  id: string;
  name: string;
}

const products: Array<Product> = [
  { id: "coffee", name: "Café" },
  { id: "tea", name: "Té" },
  { id: "juice", name: "Jugo" }
];

const OrderForm = () => {
  const [product, setProduct] = useState(products[0].id);
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Pedido: ${quantity} x ${product}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl flex-col items-stretch gap-4 bg-white p-4 shadow sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <label
          htmlFor="product-select"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Producto
        </label>
        <select
          id="product-select"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="h-12 w-full border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full sm:w-28">
        <label
          htmlFor="quantity-inpout"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Cantidad
        </label>
        <input
          id="quantity-inpout"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="h-12 w-full border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="h-12 w-full bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
      >
        Pedir
      </button>
    </form>
  );
};

export default OrderForm;
