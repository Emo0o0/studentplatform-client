import { API_BASE_URL } from "../config/constants";

export const applyForHealthInsurance = async (formData) => {
  try {
    const requestBody = mapFormDataToApplyRequest(formData);

    return await submitRequest(`${API_BASE_URL}/form/healthInsurance/apply`, requestBody);
  } catch (error) {
    console.error("Error applying for health insurance:", error);
    throw error;
  }
};

export const applyForPreviousHealthInsurance = async (formData) => {
  try {
    const requestBody = mapFormDataToPreviousApplyRequest(formData);

    return await submitRequest(`${API_BASE_URL}/form/healthInsurance/late`, requestBody);
  } catch (error) {
    console.error("Error applying for previous period health insurance:", error);
    throw error;
  }
};

export const terminateHealthInsurance = async (formData) => {
  try {
    const requestBody = mapFormDataToTerminateRequest(formData);

    return await submitRequest(`${API_BASE_URL}/form/healthInsurance/terminate`, requestBody);
  } catch (error) {
    console.error("Error terminating health insurance:", error);
    throw error;
  }
};

const mapFormDataToApplyRequest = (formData) => {
  const { personalInfo, declarationInfo } = formData;

  const nameParts = personalInfo.fullName.trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts[nameParts.length - 1] || "";
  // Join middle names if they exist
  const secondName = nameParts.length > 2 ? nameParts.slice(1, nameParts.length - 1).join(" ") : "";

  // Extract address components
  const streetName = personalInfo.street || "";
  const streetNumber = personalInfo.block ? parseInt(personalInfo.block, 10) || null : null;
  const entrance = personalInfo.entrance || "";
  const floor = personalInfo.floor ? parseInt(personalInfo.floor, 10) || null : null;
  const flatNumber = personalInfo.apartment ? parseInt(personalInfo.apartment, 10) || null : null;

  return {
    personalAcademicInfo: {
      email: "", // Add email if available in form
      firstName,
      secondName,
      lastName,
      egn: personalInfo.egn,
      phoneNumber: personalInfo.phone || "",
      placeOfResidence: personalInfo.city || "",
      streetName,
      streetNumber,
      entrance,
      floor,
      flatNumber,
      // Academic info
      facultyNumber: personalInfo.facultyNumber,
      courseYear: personalInfo.course || "",
      specialty: personalInfo.specialty || "",
      faculty: personalInfo.faculty || "",
      // The following fields might need to be added to the form or retrieved from user profile
      semester: "",
      degreeLevel: "",
      studentGroup: null,
      subGroup: null,
    },
    isReceivingWorkRelatedIncome: declarationInfo.hasEmploymentIncome,
    isReceivingPension: declarationInfo.hasPension,
    isReceivingOtherInsuredIncome: declarationInfo.hasOtherIncome,
    currentInsurer: declarationInfo.isCurrentlyInsured ? declarationInfo.insuredThrough : "",
  };
};

const mapFormDataToPreviousApplyRequest = (formData) => {
  // Extract personal info
  const { personalInfo, previousYearInfo } = formData;

  // Parse name into components (assuming format: "First Middle Last")
  const nameParts = personalInfo.fullName.trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts[nameParts.length - 1] || "";
  // Join middle names if they exist
  const secondName = nameParts.length > 2 ? nameParts.slice(1, nameParts.length - 1).join(" ") : "";

  // Extract address components
  const streetName = personalInfo.street || "";
  const streetNumber = personalInfo.block ? parseInt(personalInfo.block, 10) || null : null;
  const entrance = personalInfo.entrance || "";
  const floor = personalInfo.floor ? parseInt(personalInfo.floor, 10) || null : null;
  const flatNumber = personalInfo.apartment ? parseInt(personalInfo.apartment, 10) || null : null;

  return {
    personalAcademicInfo: {
      firstName,
      secondName,
      lastName,
      egn: personalInfo.egn,
      phoneNumber: personalInfo.phone || "",
      placeOfResidence: personalInfo.city || "",
      streetName,
      streetNumber,
      entrance,
      floor,
      flatNumber,
      // Academic info
      facultyNumber: personalInfo.facultyNumber,
      courseYear: personalInfo.course || "",
      specialty: personalInfo.specialty || "",
      faculty: personalInfo.faculty || "",
    },
    // For previous period, these are false by default because user declares they didn't receive these incomes
    schoolYear: previousYearInfo?.academicYear || "",
  };
};

const mapFormDataToTerminateRequest = (formData) => {
  // Extract personal info
  const { personalInfo, previousYearInfo } = formData;

  // Parse name into components (assuming format: "First Middle Last")
  const nameParts = personalInfo.fullName.trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts[nameParts.length - 1] || "";
  // Join middle names if they exist
  const secondName = nameParts.length > 2 ? nameParts.slice(1, nameParts.length - 1).join(" ") : "";

  // Extract address components
  const streetName = personalInfo.street || "";
  const streetNumber = personalInfo.block ? parseInt(personalInfo.block, 10) || null : null;
  const entrance = personalInfo.entrance || "";
  const floor = personalInfo.floor ? parseInt(personalInfo.floor, 10) || null : null;
  const flatNumber = personalInfo.apartment ? parseInt(personalInfo.apartment, 10) || null : null;

  let formattedDate = "";
  if (formData.terminationInfo?.terminationDate) {
    const date = new Date(formData.terminationInfo.terminationDate);
    formattedDate = date.toISOString().split("T")[0];
  }

  return {
    personalAcademicInfo: {
      firstName,
      secondName,
      lastName,
      egn: personalInfo.egn,
      phoneNumber: personalInfo.phone || "",
      placeOfResidence: personalInfo.city || "",
      streetName,
      streetNumber,
      entrance,
      floor,
      flatNumber,
      // Academic info
      facultyNumber: personalInfo.facultyNumber,
      courseYear: personalInfo.course || "",
      specialty: personalInfo.specialty || "",
      faculty: personalInfo.faculty || "",
    },
    // For previous period, these are false by default because user declares they didn't receive these incomes
    schoolYear: formattedDate,
    terminationReason: formData.terminationInfo?.terminationReason || "",
  };
};

/**
 * Generic function to submit a request and handle response
 */
const submitRequest = async (url, requestData) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  console.log("Response status:", response.status);

  // Handle both success and error cases with a single response reading
  let responseData;
  try {
    responseData = await response.json();
  } catch (e) {
    // If we can't parse JSON, get the text instead
    try {
      responseData = { message: await response.text() };
    } catch (textError) {
      responseData = { message: "Could not read response" };
    }
  }

  // After reading the response body once, check if the response was ok
  if (!response.ok) {
    throw new Error(responseData.message || `Error ${response.status}: ${response.statusText}`);
  }

  // Return success response
  return {
    success: true,
    data: responseData,
  };
};

export default {
  applyForHealthInsurance,
  applyForPreviousHealthInsurance,
  terminateHealthInsurance,
};
