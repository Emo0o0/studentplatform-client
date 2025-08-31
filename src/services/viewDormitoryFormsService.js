import { API_BASE_URL } from "../config/constants";

/**
 * Fetches dormitory application forms for a specific student
 * @param {number} studentId - The student's ID
 * @returns {Promise<Object>} - The dormitory forms data
 */
export const fetchStudentDormitoryForms = async (studentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/form/dormitory/apply?studentId=${studentId}`, {
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
    console.error("Error fetching dormitory forms:", error);
    throw error;
  }
};
