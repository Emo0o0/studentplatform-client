import { API_BASE_URL } from "../config/constants";

/**
 * Fetches scholarship forms for admin review
 * @param {string} specialty - Optional specialty filter
 * @returns {Promise<Object>} - The scholarship forms data
 */
export const fetchAdminScholarshipForms = async (specialty = "") => {
  try {
    // Using the same endpoint as student view but for all students
    let url = `${API_BASE_URL}/form/scholarship/`;
    if (specialty) {
      url += `?specialty=${specialty}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching admin scholarship forms:", error);
    throw error;
  }
};

/**
 * Updates the status of a scholarship form
 * @param {string} formId - The form ID
 * @param {string} status - The new status (APPROVED, DENIED, RETURNED, SEEN)
 * @returns {Promise<Object>} - Response from the server
 */
export const updateScholarshipFormStatus = async (formId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/form/scholarship/update/${formId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating scholarship form status:", error);
    throw error;
  }
};

/**
 * Fetches health insurance forms (all types) for admin review
 * @param {string} specialty - Optional specialty filter
 * @returns {Promise<Object>} - The insurance forms data
 */
export const fetchAdminInsuranceForms = async (specialty = "") => {
  try {
    // Build the URL with the optional specialty parameter
    let url = `${API_BASE_URL}/form/healthInsurance/all`;
    if (specialty) {
      url += `?specialty=${specialty}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching admin insurance forms:", error);
    throw error;
  }
};

/**
 * Updates the status of an insurance form
 * @param {string} formId - The form ID
 * @param {string} formType - The type of form (apply, late, terminate)
 * @param {string} status - The new status (APPROVED, DENIED, RETURNED, SEEN)
 * @returns {Promise<Object>} - Response from the server
 */
export const updateInsuranceFormStatus = async (formId, formType, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/form/healthInsurance/update/${formId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status, formType }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating insurance form status:", error);
    throw error;
  }
};

/**
 * Fetches dormitory forms for admin review
 * @param {string} specialty - Optional specialty filter
 * @returns {Promise<Object>} - The dormitory forms data
 */
export const fetchAdminDormitoryForms = async (specialty = "") => {
  try {
    // Using the same endpoint as student view but for all students
    let url = `${API_BASE_URL}/form/dormitory/apply`;
    if (specialty) {
      url += `?specialty=${specialty}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching admin dormitory forms:", error);
    throw error;
  }
};

/**
 * Updates the status of a dormitory form
 * @param {string} formId - The form ID
 * @param {string} status - The new status (APPROVED, DENIED, RETURNED, SEEN)
 * @returns {Promise<Object>} - Response from the server
 */
export const updateDormitoryFormStatus = async (formId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/form/dormitory/update/${formId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating dormitory form status:", error);
    throw error;
  }
};
