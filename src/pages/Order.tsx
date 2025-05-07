import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import api, { endpoints } from "../api";
import { ToastContainer, toast } from "react-toastify";

interface Product {
  itemId: string;
  description: string;
  quantity: number;
  price: number;
}

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
  const notifyOrderPlaced = () => toast("Orden cargada con éxito", { type: "success" });

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");

  const selectedProduct = products.find((p) => p.itemId === product);
  const unitPrice = selectedProduct?.price ?? 0;
  const totalPrice = parseFloat((unitPrice * quantity).toString()).toFixed(2);

  const isFormValid = product && quantity > 0 && email.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedProduct) {
      return;
    }

    try {
      const response = await api.post(endpoints.placeOrder, {
        item_id: selectedProduct.itemId,
        quantity,
        email,
        price: unitPrice,
        description: selectedProduct.description
      });

      if (response.status === 200) {
        setProduct(products[0].itemId); // set default selected product
        setQuantity(1);
        setEmail("");
        notifyOrderPlaced();
      }
    } catch (e) {
      console.error("Error creating purchase:", e);
    }

    setLoading(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const response = await api.get<Product[]>(endpoints.items);
      setProducts(response?.data);
      setProduct(response?.data[0].itemId); // set default selected product

      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <h2 className="w-full text-lg font-semibold">Órdenes</h2>

        {loading ? (
          <OrderSkeleton />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-xl flex-col items-stretch gap-4 bg-white p-4 shadow"
          >
            <div className="flex flex-row flex-wrap gap-2">
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
                    <option key={p.itemId} value={p.itemId}>
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
              disabled={!isFormValid || loading}
              className={`h-12 w-full px-6 font-semibold text-white transition sm:w-auto ${
                !isFormValid || loading
                  ? "cursor-not-allowed bg-gray-400"
                  : "cursor-pointer bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Comprar
            </button>
          </form>
        )}
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default Order;
