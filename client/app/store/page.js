"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function StorePage() {
  const [stores, setStores] = useState([]);
  const [name, setName] = useState("");
  const router = useRouter();

  // Fetch stores
  useEffect(() => {
    fetch("/api/stores")
      .then(res => res.json())
      .then(data => setStores(data.data || []));
  }, []);

  // Create store
  const createStore = async () => {
    const res = await fetch('/api/stores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, user_id: 1 }),
    });

    const data = await res.json();
    alert(data.message);
    router.push('/');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Store Management</h1>

      <input
        placeholder="Store name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={createStore}>Create Store</button>

      <hr />

      <ul>
        {stores.map((store) => (
          <li key={store.id}>
            {store.name} (User ID: {store.user_id})
          </li>
        ))}
      </ul>
    </div>
  );
}
