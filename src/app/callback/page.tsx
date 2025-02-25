"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (!code) {
        router.push("/login");
        return;
      }

      try {
        const response = await axios.post(`https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/oauth/token`, {
          grant_type: "authorization_code",
          client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
          code,
          redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
        });

        const { access_token } = response.data;

        if (access_token) {
          localStorage.setItem("token", access_token);
          document.cookie = `token=${access_token}; path=/;`;
          router.push("/dashboard");
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error exchanging token:", error);
        router.push("/login");
      }
    };

    handleAuth();
  }, [router]);

  return <p>Authenticating...</p>;
}
