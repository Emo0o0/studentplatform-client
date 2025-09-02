import { API_BASE_URL } from "../config/constants";
import { authGet } from "./apiUtility";

/**
 * Fetches dormitory application forms for a specific student
 * @param {number} studentId - The student's ID
 * @returns {Promise<Object>} - The dormitory forms data
 */
export const fetchStudentDormitoryForms = async (studentId) => {
  try {
    return await authGet(`${API_BASE_URL}/form/dormitory/apply?studentId=${studentId}`);
  } catch (error) {
    console.error("Error fetching dormitory forms:", error);
    throw error;
  }
};
