import { API_BASE_URL } from "../config/constants";

/**
 * Fetches insurance forms for applying for the current year
 * @param {number} studentId - The student's ID
 * @returns {Promise<Object>} - The insurance forms data
 */
export const fetchInsuranceApplyForms = async (studentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/form/healthInsurance/apply?studentId=${studentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      //   credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching insurance apply forms:", error);
    throw error;
  }
};

/**
 * Fetches insurance forms for applying for previous years
 * @param {number} studentId - The student's ID
 * @returns {Promise<Object>} - The insurance forms data
 */
export const fetchInsuranceLateforms = async (studentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/form/healthInsurance/late?studentId=${studentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching insurance late forms:", error);
    throw error;
  }
};

/**
 * Fetches insurance termination forms
 * @param {number} studentId - The student's ID
 * @returns {Promise<Object>} - The insurance forms data
 */
export const fetchInsuranceTerminateForms = async (studentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/form/healthInsurance/terminate?studentId=${studentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching insurance termination forms:", error);
    throw error;
  }
};
