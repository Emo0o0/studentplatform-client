import { API_BASE_URL } from "../config/constants";

/**
 * Submit a request to keep the same dormitory room
 * @param {Object} data Room information
 * @returns {Promise} Promise with the response containing the form ID
 */
export const keepDormitoryRoom = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/form/dormitory/keepRoom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buildingNumber: parseInt(data.buildingNumber, 10),
        roomNumber: parseInt(data.roomNumber, 10),
      }),
    });

    // Handle both success and error cases with a single response reading
    let responseData;
    try {
      responseData = await response.json();
    } catch (e) {
      responseData = { message: await response.text() };
    }

    if (!response.ok) {
      throw new Error(responseData.message || `Error ${response.status}: ${response.statusText}`);
    }

    return {
      formId: responseData.formId,
      ...responseData,
    };
  } catch (error) {
    console.error("Error submitting keep room request:", error);
    throw error;
  }
};

/**
 * Submit dormitory application form
 * @param {Object} formData The complete form data
 * @param {Number|null} keepRoomFormId Optional ID of the keep room form if submitted
 * @returns {Promise} Promise with the response
 */
export const applyForDormitory = async (formData, keepRoomFormId = null) => {
  try {
    // Transform UI form data to match API DTO structure
    const requestBody = mapFormDataToDormitoryRequest(formData, keepRoomFormId);

    const response = await fetch(`${API_BASE_URL}/form/dormitory/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || `Error ${response.status}: ${response.statusText}`);
    }

    return responseData;
  } catch (error) {
    console.error("Error submitting dormitory application:", error);
    throw error;
  }
};

/**
 * Maps the form data to the API DTO format
 */
const mapFormDataToDormitoryRequest = (formData, keepRoomFormId) => {
  const { personalInfo, dormitoryInfo, familyInfo } = formData;

  // Parse name into components (assuming format: "First Middle Last")
  const nameParts = personalInfo.fullName.trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts[nameParts.length - 1] || "";
  // Join middle names if they exist
  const secondName = nameParts.length > 2 ? nameParts.slice(1, nameParts.length - 1).join(" ") : "";

  // Map family members
  const familyMembers = [];

  // Add father if provided
  if (familyInfo?.father?.name) {
    familyMembers.push({
      name: familyInfo.father.name,
      address: familyInfo.father.address || "",
      phoneNumber: familyInfo.father.phone || "",
      dateOfBirth: "", // Optional field
      familyMemberRelation: "FATHER",
    });
  }

  // Add mother if provided
  if (familyInfo?.mother?.name) {
    familyMembers.push({
      name: familyInfo.mother.name,
      address: familyInfo.mother.address || "",
      phoneNumber: familyInfo.mother.phone || "",
      dateOfBirth: "", // Optional field
      familyMemberRelation: "MOTHER",
    });
  }

  // Add siblings if provided
  if (Array.isArray(familyInfo?.siblings)) {
    familyInfo.siblings.forEach((sibling) => {
      if (sibling.name) {
        familyMembers.push({
          name: sibling.name,
          address: sibling.address || "",
          phoneNumber: sibling.phone || "",
          dateOfBirth: "", // Optional field
          familyMemberRelation: sibling.type === "brother" ? "BROTHER" : "SISTER",
        });
      }
    });
  }

  // Add spouse if provided
  if (familyInfo?.spouse?.name) {
    familyMembers.push({
      name: familyInfo.spouse.name,
      address: familyInfo.spouse.address || "",
      phoneNumber: familyInfo.spouse.phone || "",
      dateOfBirth: "", // Optional field
      familyMemberRelation: "SPOUSE",
    });
  }

  // Add children if provided
  if (Array.isArray(familyInfo?.children)) {
    familyInfo.children.forEach((child) => {
      if (child.name) {
        familyMembers.push({
          name: child.name,
          address: "",
          phoneNumber: "",
          dateOfBirth: child.birthDate || "",
          familyMemberRelation: "CHILD",
        });
      }
    });
  }

  return {
    personalAcademicInfo: {
      email: personalInfo.email || "",
      firstName,
      secondName,
      lastName,
      egn: personalInfo.egn || "",
      phoneNumber: personalInfo.phone || "",
      placeOfResidence: personalInfo.city || "",
      streetName: personalInfo.street || "",
      streetNumber: personalInfo.block ? parseInt(personalInfo.block, 10) || null : null,
      entrance: personalInfo.entrance || "",
      floor: personalInfo.floor ? parseInt(personalInfo.floor, 10) || null : null,
      flatNumber: personalInfo.apartment ? parseInt(personalInfo.apartment, 10) || null : null,
      // Academic info
      facultyNumber: personalInfo.facultyNumber || "",
      courseYear: personalInfo.course || "",
      specialty: personalInfo.specialty || "",
      semester: personalInfo.semester || "",
      degreeLevel: dormitoryInfo.degreeLevel || "BACHELOR",
      faculty: personalInfo.faculty || "",
      studentGroup: null,
      subGroup: null,
    },
    degreeLevel: dormitoryInfo.degreeLevel || "BACHELOR",
    buildingNumber: parseInt(dormitoryInfo.buildingNumber, 10) || 1,
    roomNumber: parseInt(dormitoryInfo.roomNumber, 10) || 0,
    familyMembers: familyMembers,
    keepRoomFormId: keepRoomFormId,
  };
};

export default {
  keepDormitoryRoom,
  applyForDormitory,
};
