import React, { useState, useTransition, useDeferredValue, useOptimistic } from "react";

type Cake = { id: number; name: string };
type CartItem = { id: number; name: string; confirmed: boolean };

const fetchCakes = async (query: string): Promise<Cake[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5s delay
  const allCakes = [
    { id: 1, name: "Chocolate Cake" },
    { id: 2, name: "Vanilla Cake" },
    { id: 3, name: "Red Velvet Cake" },
  ];
  return allCakes.filter((cake) =>
    cake.name.toLowerCase().includes(query.toLowerCase())
  );
};

const addToCartApi = async (cake: Cake): Promise<CartItem> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1s delay
  return { ...cake, confirmed: true };
};

const CakeShop: React.FC = () => {
  // Search
  const [searchTerm, setSearchTerm] = useState<string>("");
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [isPending, startTransition] = useTransition();

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [optimisticCart, setOptimisticCart] = useOptimistic<CartItem[], Cake>(
    cart,
    (currentCart, newCake) => [...currentCart, { ...newCake, confirmed: false }]
  );

  // Search logic
  React.useEffect(() => {
    startTransition(async () => {
      const results = await fetchCakes(deferredSearchTerm);
      setCakes(results);
    });
  }, [deferredSearchTerm]);

  // Cart logic
  const addToCart = async (cake: Cake) => {
    setOptimisticCart(cake);
    try {
      const confirmedItem = await addToCartApi(cake);
      setCart((prev) => [...prev, confirmedItem]);
    } catch {
      setCart(cart);
    }
  };

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search cakes"
      />
      {isPending && <p>Fetching cakes...</p>}
      <ul>
        {cakes.map((cake) => (
          <li key={cake.id}>
            {cake.name}{" "}
            <button onClick={() => addToCart(cake)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      <h3>Cart</h3>
      <ul>
        {optimisticCart.map((item) => (
          <li key={item.id}>
            {item.name} {item.confirmed ? "✔" : "(Pending)"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CakeShop;