import keycloak from "../config/keycloak";

/**
 * Authenticated fetch utility that handles token refresh automatically
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options (method, headers, body, etc)
 * @returns {Promise<Response>} - Fetch response
 */
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

/**
 * Authenticated JSON fetch utility that handles token refresh and JSON parsing
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options (method, headers, body, etc)
 * @returns {Promise<any>} - Parsed JSON response
 */
export const authFetchJson = async (url, options = {}) => {
  const response = await authFetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText || response.statusText}`);
  }

  return await response.json(); // Make sure to await the json() call
};

/**
 * Authenticated GET request that returns parsed JSON
 */
export const authGet = async (url, options = {}) => {
  // Added async
  return await authFetchJson(url, { ...options, method: "GET" }); // Added await
};

/**
 * Authenticated POST request that sends and returns JSON
 */
export const authPost = async (url, data, options = {}) => {
  // Added async
  return await authFetchJson(url, {
    // Added await
    ...options,
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  });
};

/**
 * Authenticated PUT request that sends and returns JSON
 */
export const authPut = async (url, data = {}, options = {}) => {
  // Added async and default empty object for data
  return await authFetchJson(url, {
    // Added await
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined, // Only stringify if data exists
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  });
};

/**
 * Authenticated DELETE request
 */
export const authDelete = async (url, options = {}) => {
  // Added async
  return await authFetch(url, { ...options, method: "DELETE" }); // Added await
};
