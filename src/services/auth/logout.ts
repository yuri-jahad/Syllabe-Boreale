const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default async function logout() {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("Unable to logout. Please try again.");
  }
}
