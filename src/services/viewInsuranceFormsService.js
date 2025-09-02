import { API_BASE_URL } from "../config/constants";
import { authGet } from "./apiUtility";
/**
 * Fetches insurance forms for applying for the current year
 * @param {number} studentId - The student's ID
 * @returns {Promise<Object>} - The insurance forms data
 */
export const fetchInsuranceApplyForms = async (studentId) => {
  try {
    return await authGet(`${API_BASE_URL}/form/healthInsurance/apply?studentId=${studentId}`);
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
    return await authGet(`${API_BASE_URL}/form/healthInsurance/late?studentId=${studentId}`);
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
    return await authGet(`${API_BASE_URL}/form/healthInsurance/terminate?studentId=${studentId}`);
  } catch (error) {
    console.error("Error fetching insurance termination forms:", error);
    throw error;
  }
};
