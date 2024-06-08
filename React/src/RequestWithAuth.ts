// authApi.ts
export const requestWithAuth = async (
  url: string,
  options: RequestInit = {}
) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response;
};
