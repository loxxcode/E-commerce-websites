"use client";

import { useEffect, useState } from "react";

export default function StorePage() {
  const [stores, setStores] = useState([]);
  const [name, setName] = useState("");

  // Fetch stores
  useEffect(() => {
    fetch("http://localhost/ecommerce-admin-api/api/store_list.php")
      .then(res => res.json())
      .then(data => setStores(data.data || []));
  }, []);

  // Create store
  const createStore = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("user_id", 1);

    const res = await fetch(
      "http://localhost/ecommerce-admin-api/api/store_create.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    alert(data.message);
    location.reload();
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
