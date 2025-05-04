import type { User } from "@/types/user.type";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default async function login(user: User) {

  if (!user?.username || !user?.password) {
    throw new Error("Username and password are required");
  }

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        username: user.username.trim(),
        password: user.password,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Authentication failed");
    }


    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Unable to login. Please try again.");
  }
}
