import { API_BASE_URL } from "../config/constants";
import { authGet, authPut } from "./apiUtility";

export const fetchAdminScholarshipForms = async (specialty = "") => {
  try {
    let url = `${API_BASE_URL}/form/scholarship/`;
    if (specialty) {
      url += `?specialty=${specialty}`;
    }

    return await authGet(url);
  } catch (error) {
    console.error("Error fetching admin scholarship forms:", error);
    throw error;
  }
};

export const updateScholarshipFormStatus = async (formId, status) => {
  try {
    const url = `${API_BASE_URL}/form/scholarship/update?formId=${formId}&status=${status}`;
    return await authPut(url, {});
  } catch (error) {
    console.error("Error updating scholarship form status:", error);
    throw error;
  }
};

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
