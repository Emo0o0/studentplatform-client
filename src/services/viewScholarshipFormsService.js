import { API_BASE_URL } from "../config/constants";
import { authGet } from "./apiUtility";
/**
 * Fetches scholarship forms for a specific student
 * @param {number} studentId - The student's ID
 * @returns {Promise<Object>} - The scholarship forms data
 */
export const fetchStudentScholarshipForms = async (studentId) => {
  try {
    return await authGet(`${API_BASE_URL}/form/scholarship/?studentId=${studentId}`);
  } catch (error) {
    console.error("Error fetching scholarship forms:", error);
    throw error;
  }
};
