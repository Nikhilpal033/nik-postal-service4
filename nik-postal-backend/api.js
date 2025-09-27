export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  return fetch(`http://localhost:5000${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });
}
