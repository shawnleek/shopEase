import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data));
  }, []);

  if (orders.length === 0)
    return <p className="text-center mt-20 text-xl">No orders yet.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      {orders.map((order) => (
        <div key={order.id} className="border rounded-xl p-6 mb-4 shadow">
          <div className="flex justify-between mb-3">
            <span className="font-semibold">Order #{order.id}</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {order.status}
            </span>
          </div>
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm py-1 border-b">
              <span>
                {item.productName} x {item.quantity}
              </span>
              <span>R{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <p className="text-right font-bold mt-3">
            Total: R{order.totalPrice.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}
