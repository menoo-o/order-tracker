import React, { useOptimistic } from "react";
import { Order } from "../lib/types/exporttypes";

// Simulated API function to mark an order as "Ready"
const markOrderAsReady = async (orderId: number): Promise<Order> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
  // Simulate 20% chance of failure (e.g., "out of ingredients")
  if (Math.random() < 0.2) {
    throw new Error("Out of ingredients");
  }
  return { id: orderId, customerName: "", status: "Ready" }; // Minimal return, status updated
};

type OrderListProps = {
  orders: Order[];
  onUpdateOrder: (updatedOrder: Order) => void;
};

const OrderList: React.FC<OrderListProps> = ({ orders, onUpdateOrder }) => {
  const [optimisticOrders, setOptimisticOrders] = useOptimistic<
    Order[],
    number // Action type is the order ID
  >(orders, (currentOrders, orderId) =>
    currentOrders.map((order) =>
      order.id === orderId ? { ...order, status: "Ready" } : order
    )
  );

  const handleMarkAsReady = async (order: Order) => {
    if (order.status === "Ready") return; // Skip if already "Ready"

    // Optimistically update the UI
    setOptimisticOrders(order.id);

    try {
      // Call the API to confirm
      const updatedOrder = await markOrderAsReady(order.id);
      // Update the parent state with the confirmed order
      onUpdateOrder({ ...order, status: updatedOrder.status });
    } catch (error) {
      // Revert on failure (parent state remains unchanged)
      console.error(error);
      alert("Failed to mark as ready: Out of ingredients");
    }
  };

  return (
    <ul>
      {optimisticOrders.map((order) => (
        <li key={order.id}>
          {order.customerName} - {order.status}
          <button
            onClick={() => handleMarkAsReady(order)}
            disabled={order.status === "Ready"}
            style={{ marginLeft: "10px" }}
          >
            Mark as Ready
          </button>
        </li>
      ))}
    </ul>
  );
};

export default OrderList;