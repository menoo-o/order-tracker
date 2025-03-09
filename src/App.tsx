import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import OrderList from "../components/OrderList";
import { Order } from "../lib/types/exporttypes";

const App: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const handleUpdateOrder = (updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  };

  return (
    <div>
      <h1>Cake Shop Order Tracker</h1>
      <SearchBar orders={orders} setOrders={setOrders} />
      <OrderList orders={orders} onUpdateOrder={handleUpdateOrder} />
    </div>
  );
};

export default App;