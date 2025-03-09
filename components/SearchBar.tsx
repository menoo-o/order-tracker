import React, { useState, useTransition, useDeferredValue, useEffect } from "react";
import { Order } from "../lib/types/exporttypes";

const fetchName = async (query: string): Promise<Order[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // delay 1.5sec
  const allOrders = [
    {
      id: 1,
      customerName: "john",
      status: "Pending",
    },
    {
      id: 2,
      customerName: "Jane",
      status: "Ready",
    },
    {
      id: 3,
      customerName: "Doe",
      status: "Pending",
    },
  ];

  return allOrders.filter((order) =>
    order.customerName.toLowerCase().includes(query.toLowerCase())
  );
};

const SearchBar: React.FC = () => {
  const [name, setName] = useState<string>("");
  const deferredSearchName = useDeferredValue(name);
  const [isPending, startTransition] = useTransition();
  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch orders when deferredSearchName changes
  useEffect(() => {
    startTransition(async () => {
      const fetchedOrders = await fetchName(deferredSearchName);
      setOrders(fetchedOrders);
    });
  }, [deferredSearchName]);

  return (
    <>
      <label>Enter Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      />
      {isPending && <p>Loading orders...</p>}
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.customerName} - {order.status}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchBar;