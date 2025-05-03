import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
}

const products: Array<Product> = [
  { id: "coffee", name: "Café", price: 1200 },
  { id: "tea", name: "Té", price: 800 },
  { id: "juice", name: "Jugo", price: 1500 }
];

const Order = () => {
  const [product, setProduct] = useState(products[0].id);
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");

  const selectedProduct = products.find((p) => p.id === product)!;
  const unitPrice = selectedProduct.price;
  const totalPrice = unitPrice * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Pedido: ${quantity} x ${selectedProduct.name} = $${totalPrice}`);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <h2 className="w-full text-lg font-semibold">Ordenes</h2>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-xl flex-col items-stretch gap-4 bg-white p-4 shadow"
      >
        <div className="flex flex-row gap-2">
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
              htmlFor="quantity-input"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Cantidad
            </label>
            <input
              id="quantity-input"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="h-12 w-full border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 text-sm text-gray-700 sm:flex-row">
          <div>
            <span className="font-medium">Precio unitario:</span> ${unitPrice}
          </div>
          <div>
            <span className="font-medium">Precio total:</span> ${totalPrice}
          </div>
        </div>

        <div className="w-full">
          <label
            htmlFor="email-input"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="h-12 w-full bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
        >
          Comprar
        </button>
      </form>
    </div>
  );
};

export default Order;
