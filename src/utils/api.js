const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// GET /items //
function getItems() {
  return request(`${baseUrl}/items`);
}

function addNewClothing({ name, imageUrl, weather }, token) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
}

function deleteClothing(_id) {
  return request(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}

// POST /signup //
function addNewUser({ name, email, password, avatarUrl }) {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatarUrl, email, password }),
  });
}

// POST /signin //
function authenticateUser({ email, password }) {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

// GET /userinfo //
function getUserInfo(token) {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately
      // formatted value.
      Authorization: `Bearer ${token}`,
    },
  });
}

export {
  getItems,
  addNewClothing,
  deleteClothing,
  addNewUser,
  authenticateUser,
  getUserInfo,
};
