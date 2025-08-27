import { API_BASE_URL } from "../config/constants";

/**
 * Submit handler for Merit Success scholarship
 * This matches the MeritScholarshipApplyRequest.java structure exactly
 */
export const handleScholarshipSubmit = async (formData) => {
  try {
    // First, let's ensure we're only handling the Merit Success case
    if (formData.scholarshipType !== "MERIT_SUCCESS") {
      return {
        success: false,
        error: "Only Merit Success scholarships are supported at this time",
      };
    }

    // Create request payload EXACTLY matching MeritScholarshipApplyRequest.java
    const requestData = {
      personalAcademicInfo: {
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
        subGroup: formData.academicInfo?.subGroup || null,
      },

      bankingInfo: {
        bankName: formData.bankInfo?.bankName || "", // Note: Server expects BankName enum value
        bankAccount: formData.bankInfo?.iban || "",
      },

      // The specific Merit Success field
      previousGPA: parseFloat(formData.specificInfo?.previousGPA) || null,
    };

    console.log("Sending data:", JSON.stringify(requestData, null, 2));

    // Make a simple JSON request
    const response = await fetch(`${API_BASE_URL}/form/scholarship/merit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    console.log("Response status:", response.status);

    // Handle error response
    if (!response.ok) {
      let errorText;
      try {
        const errorData = await response.json();
        errorText = errorData.message || "Error submitting application";
      } catch (e) {
        errorText = (await response.text()) || "Unknown error";
      }
      throw new Error(errorText);
    }

    // Parse and return success response
    const responseData = await response.json();
    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    console.error("Error submitting scholarship:", error);
    return {
      success: false,
      error: error.message || "Error submitting application",
    };
  }
};
