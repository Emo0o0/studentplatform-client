import { API_BASE_URL } from "../config/constants";
import { authGet } from "./apiUtility";

export const fetchStudentDormitoryForms = async (studentId) => {
  try {
    return await authGet(`${API_BASE_URL}/form/dormitory/apply?studentId=${studentId}`);
  } catch (error) {
    console.error("Error fetching dormitory forms:", error);
    throw error;
  }
};
