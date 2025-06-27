import axios from "axios";

export async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post(
      "http://localhost:8001/api/v1/login",
      { email, password },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    if (!data.status) {
      throw new Error(data.message || "Login failed");
    }

    return data.data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Login error");
      } else if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Error desconocido");
      }
  }
}