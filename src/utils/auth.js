const baseUrl = "http://localhost:3001";
import { request } from "./api";

// POST /signup //
export function addNewUser({ name, email, password, avatarUrl }) {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatarUrl, email, password }),
  });
}

// POST /signin //
export function authenticateUser({ email, password }) {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}
