import { API_BASE_URL } from "../config/constants";

/**
 * Fetches scholarship forms for a specific student
 * @param {number} studentId - The student's ID
 * @returns {Promise<Object>} - The scholarship forms data
 */
export const fetchStudentScholarshipForms = async (studentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/form/scholarship/?studentId=${studentId}`, {
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
    console.error("Error fetching scholarship forms:", error);
    throw error;
  }
};
