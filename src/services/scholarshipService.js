import { API_BASE_URL } from "../config/constants";
import { authPost } from "./apiUtility";

export const handleScholarshipSubmit = async (formData) => {
  try {
    switch (formData.scholarshipType) {
      case "MERIT_SUCCESS":
        return await handleMeritSuccessSubmit(formData);
      case "FIRST_YEAR":
        return await handleFirstYearSubmit(formData);
      case "FOREIGN_STUDENT":
        return await handleForeignStudentSubmit(formData);
      case "MERIT_WITH_INCOME":
        return await handleMeritWithIncomeSubmit(formData);
      case "SOCIAL_PREFERENTIAL":
        return await handleSocialPreferentialSubmit(formData);
      case "SPECIAL_ACHIEVEMENTS":
        return await handleSpecialAchievementSubmit(formData);
      default:
        return {
          success: false,
          error: "This scholarship type is not supported yet",
        };
    }
  } catch (error) {
    console.error("Error submitting scholarship:", error);
    return {
      success: false,
      error: error.message || "Error submitting application",
    };
  }
};

const buildPersonalAcademicInfo = (formData) => {
  return {
    // Personal info
    firstName: formData.personalInfo.firstName,
    secondName: formData.personalInfo.middleName || "",
    lastName: formData.personalInfo.lastName,
    egn: formData.personalInfo.egn,
    email: formData.personalInfo.email,
    phoneNumber: formData.personalInfo.phone,
    placeOfResidence: formData.personalInfo.city,
    streetName: formData.personalInfo.street,
    streetNumber: parseInt(formData.personalInfo.streetNumber || "0", 10),
    entrance: formData.personalInfo.entrance || "",
    floor: formData.personalInfo.floor ? parseInt(formData.personalInfo.floor, 10) : null,
    flatNumber: formData.personalInfo.apartment ? parseInt(formData.personalInfo.apartment, 10) : null,

    // Academic info
    facultyNumber: formData.academicInfo?.facultyNumber || "",
    courseYear: formData.academicInfo?.courseYear || "",
    semester: formData.academicInfo?.semester || "",
    degreeLevel: formData.academicInfo?.degreeLevel || "",
    faculty: formData.academicInfo?.faculty || "",
    specialty: formData.academicInfo?.specialty || "",
    studentGroup: formData.academicInfo?.studentGroup ? parseInt(formData.academicInfo.studentGroup, 10) : null,
    subGroup: formData.academicInfo?.subGroup ? formData.academicInfo.subGroup.charAt(0).toUpperCase() : null,
  };
};

const buildBankingInfo = (formData) => {
  return {
    bankName: formData.bankInfo?.bankName || "",
    bankAccount: formData.bankInfo?.iban || "",
  };
};

const handleMeritSuccessSubmit = async (formData) => {
  const requestData = {
    personalAcademicInfo: buildPersonalAcademicInfo(formData),
    bankingInfo: buildBankingInfo(formData),
    // The specific Merit Success field
    previousGPA: parseFloat(formData.specificInfo?.previousGPA) || null,
  };

  return await submitAuthRequest(`${API_BASE_URL}/form/scholarship/merit`, requestData);
};

const handleFirstYearSubmit = async (formData) => {
  const requestData = {
    personalAcademicInfo: buildPersonalAcademicInfo(formData),
    bankingInfo: buildBankingInfo(formData),
    // First Year specific fields
    professionalDirection: formData.specificInfo?.professionalDirection || "",
    bulgarianLanguageGrade: parseFloat(formData.specificInfo?.bulgarianLanguageGrade) || null,
    secondExamSubject: formData.specificInfo?.secondSubject || "",
    secondExamGrade: parseFloat(formData.specificInfo?.secondSubjectGrade) || null,
  };

  return await submitAuthRequest(`${API_BASE_URL}/form/scholarship/firstyear`, requestData);
};

const handleForeignStudentSubmit = async (formData) => {
  const requestData = {
    personalAcademicInfo: buildPersonalAcademicInfo(formData),
    bankingInfo: buildBankingInfo(formData),
    // The specific Foreign scholarship field
    countryOfOrigin: formData.specificInfo?.countryOfOrigin || "",
  };

  return await submitAuthRequest(`${API_BASE_URL}/form/scholarship/foreign`, requestData);
};

const handleSocialPreferentialSubmit = async (formData) => {
  const requestData = {
    personalAcademicInfo: buildPersonalAcademicInfo(formData),
    bankingInfo: buildBankingInfo(formData),
    // Social specific field
    socialType: formData.specificInfo?.socialType || "",
    hasMarriage: formData.specificInfo?.hasMarriage || false,
  };

  return await submitAuthRequest(`${API_BASE_URL}/form/scholarship/social`, requestData);
};

const handleSpecialAchievementSubmit = async (formData) => {
  const requestData = {
    personalAcademicInfo: buildPersonalAcademicInfo(formData),
    bankingInfo: buildBankingInfo(formData),
    achievementTopic: formData.specificInfo?.achievementTopic || "",
  };

  return await submitAuthRequest(`${API_BASE_URL}/form/scholarship/achievement`, requestData);
};

const handleMeritWithIncomeSubmit = async (formData) => {
  const parseIncome = (value) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0.0 : parsed;
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD
    } catch (e) {
      return null;
    }
  };

  const requestData = {
    personalAcademicInfo: buildPersonalAcademicInfo(formData),
    bankingInfo: buildBankingInfo(formData),

    previousGPA: parseFloat(formData.specificInfo?.previousGPA) || null,

    familyStatus: formData.specificInfo?.familyStatus || "",

    spouseName: formData.incomeInfo?.spouseName || "",
    spouseEmploymentStatus: formData.incomeInfo?.spouseEmploymentStatus || "",
    children: Array.isArray(formData.incomeInfo?.children)
      ? formData.incomeInfo.children.map((child) => ({
          fullName: child.fullName || "",
          birthDate: formatDate(child.birthDate),
        }))
      : [],

    fatherName: formData.incomeInfo?.fatherName || "",
    fatherStatus: formData.incomeInfo?.fatherStatus || "",
    motherName: formData.incomeInfo?.motherName || "",
    motherStatus: formData.incomeInfo?.motherStatus || "",
    siblings: Array.isArray(formData.incomeInfo?.siblings)
      ? formData.incomeInfo.siblings.map((sibling) => ({
          fullName: sibling.fullName || "",
          educationStatus: sibling.educationStatus || "",
        }))
      : [],

    salaries: parseIncome(formData.incomeInfo?.salaries),
    pensions: parseIncome(formData.incomeInfo?.pensions),
    unemploymentBenefits: parseIncome(formData.incomeInfo?.unemploymentBenefits),
    socialAid: parseIncome(formData.incomeInfo?.socialAid),
    familyAllowances: parseIncome(formData.incomeInfo?.familyAllowances),
    childCareAllowances: parseIncome(formData.incomeInfo?.childCareAllowances),
    personalScholarships: parseIncome(formData.incomeInfo?.personalScholarships),
    rent: parseIncome(formData.incomeInfo?.rent),
    honorariums: parseIncome(formData.incomeInfo?.honorariums),
    alimony: parseIncome(formData.incomeInfo?.alimony),
    businessIncome: parseIncome(formData.incomeInfo?.businessIncome),
    otherIncome: parseIncome(formData.incomeInfo?.otherIncome),
    totalIncome: parseIncome(formData.specificInfo?.totalIncome),
    monthlyIncomePerMember: parseIncome(formData.specificInfo?.monthlyIncome),
  };

  return await submitAuthRequest(`${API_BASE_URL}/form/scholarship/meritincome`, requestData);
};

const submitAuthRequest = async (url, requestData) => {
  try {
    const response = await authPost(url, requestData);
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error("Error in authenticated request:", error);
    return {
      success: false,
      error: error.message || "An error occurred during submission",
    };
  }
};
