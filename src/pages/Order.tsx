import { useEffect, useState } from "react";
import { Product } from "../types/Products";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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

const OrderSkeleton = () => (
  <div className="flex w-full max-w-xl flex-col gap-4 bg-white p-4 shadow">
    <div className="flex gap-2">
      <div className="flex-1">
        <Skeleton height={16} width={80} />
        <Skeleton height={48} />
      </div>
      <div className="w-28">
        <Skeleton height={16} width={60} />
        <Skeleton height={48} />
      </div>
    </div>
    <div className="flex justify-between text-sm text-gray-700">
      <Skeleton width={120} height={20} />
      <Skeleton width={120} height={20} />
    </div>
    <div>
      <Skeleton height={16} width={80} />
      <Skeleton height={48} />
    </div>
    <Skeleton height={48} />
  </div>
);

const Order = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");

  const selectedProduct = products.find((p) => p.item_id === product);
  const unitPrice = selectedProduct?.price ?? 0;
  const totalPrice = unitPrice * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProduct) {
      alert(`Pedido: ${quantity} x ${selectedProduct.description} = $${totalPrice}`);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await new Promise<Product[]>((resolve) => {
        setTimeout(() => {
          resolve(mockedItems);
        }, 1000);
      });

      setProducts(response);
      setProduct(response[0].item_id); // set default selected product
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <h2 className="w-full text-lg font-semibold">Órdenes</h2>

      {loading ? (
        <OrderSkeleton />
      ) : (
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
                  <option key={p.item_id} value={p.item_id}>
                    {p.description}
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
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="h-12 w-full bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
          >
            Comprar
          </button>
        </form>
      )}
    </div>
  );
};

export default Order;
