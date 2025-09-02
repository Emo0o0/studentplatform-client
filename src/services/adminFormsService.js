import { API_BASE_URL } from "../config/constants";
import { authGet, authPut } from "./apiUtility";

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

    // The authGet function already handles json parsing
    return await authGet(url);

    // Remove the json parsing here as authGet already does this
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
    const url = `${API_BASE_URL}/form/scholarship/update?formId=${formId}&status=${status}`;
    // For PUT requests with no body, pass empty object as data
    return await authPut(url, {});
  } catch (error) {
    console.error("Error updating scholarship form status:", error);
    throw error;
  }
};

// Update all other functions similarly
export const fetchAdminInsuranceApplyForms = async (specialty = "") => {
  try {
    let url = `${API_BASE_URL}/form/healthInsurance/apply`;
    if (specialty) {
      url += `?specialty=${specialty}`;
    }
    return await authGet(url);
  } catch (error) {
    console.error("Error fetching admin insurance apply forms:", error);
    throw error;
  }
};

export const fetchAdminInsuranceLateForms = async (specialty = "") => {
  try {
    let url = `${API_BASE_URL}/form/healthInsurance/late`;
    if (specialty) {
      url += `?specialty=${specialty}`;
    }
    return await authGet(url);
  } catch (error) {
    console.error("Error fetching admin insurance late forms:", error);
    throw error;
  }
};

export const fetchAdminInsuranceTerminateForms = async (specialty = "") => {
  try {
    let url = `${API_BASE_URL}/form/healthInsurance/terminate`;
    if (specialty) {
      url += `?specialty=${specialty}`;
    }
    return await authGet(url);
  } catch (error) {
    console.error("Error fetching admin insurance terminate forms:", error);
    throw error;
  }
};

export const updateInsuranceFormStatus = async (formId, formType, status) => {
  try {
    const url = `${API_BASE_URL}/form/healthInsurance/${formType}/update?formId=${formId}&status=${status}`;
    return await authPut(url, {});
  } catch (error) {
    console.error("Error updating insurance form status:", error);
    throw error;
  }
};

export const fetchAdminDormitoryForms = async (specialty = "") => {
  try {
    let url = `${API_BASE_URL}/form/dormitory/apply`;
    if (specialty) {
      url += `?specialty=${specialty}`;
    }
    return await authGet(url);
  } catch (error) {
    console.error("Error fetching admin dormitory forms:", error);
    throw error;
  }
};

export const updateDormitoryFormStatus = async (formId, status) => {
  try {
    const url = `${API_BASE_URL}/form/dormitory/update?formId=${formId}&status=${status}`;
    return await authPut(url, {});
  } catch (error) {
    console.error("Error updating dormitory form status:", error);
    throw error;
  }
};
