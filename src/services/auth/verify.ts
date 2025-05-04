const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default async function verify() {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Verification failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Auth verification error:", error);
    throw new Error("Unable to verify authentication");
  }
}
