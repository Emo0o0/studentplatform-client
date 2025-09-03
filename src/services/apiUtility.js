import keycloak from "../config/keycloak";

export const authFetch = async (url, options = {}) => {
  try {
    await keycloak.updateToken(30);
  } catch (tokenError) {
    console.error("Failed to refresh token:", tokenError);
    keycloak.login();
    throw new Error("Authentication required");
  }

  const authOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${keycloak.token}`,
      "Content-Type": options.headers?.["Content-Type"] || "application/json",
    },
  };

  return fetch(url, authOptions);
};

export const authFetchJson = async (url, options = {}) => {
  const response = await authFetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText || response.statusText}`);
  }

  return await response.json();
};

export const authGet = async (url, options = {}) => {
  return await authFetchJson(url, { ...options, method: "GET" });
};

export const authPost = async (url, data, options = {}) => {
  return await authFetchJson(url, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  });
};

export const authPut = async (url, data = {}, options = {}) => {
  return await authFetchJson(url, {
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  });
};

export const authDelete = async (url, options = {}) => {
  return await authFetch(url, { ...options, method: "DELETE" });
};
