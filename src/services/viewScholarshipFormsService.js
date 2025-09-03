import { API_BASE_URL } from "../config/constants";
import { authGet } from "./apiUtility";

export const fetchStudentScholarshipForms = async (studentId) => {
  try {
    return await authGet(`${API_BASE_URL}/form/scholarship/?studentId=${studentId}`);
  } catch (error) {
    console.error("Error fetching scholarship forms:", error);
    throw error;
  }
};
