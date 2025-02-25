"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    axios
      .get(`https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/userinfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/login");
      });
  }, [router]);

  if (!user) {
    return <div>Loading user info...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <button
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
        onClick={() => {
          localStorage.clear();
          document.cookie = "token=; Max-Age=0; path=/;";
          router.push("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
