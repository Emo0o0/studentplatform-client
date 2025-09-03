import { API_BASE_URL } from "../config/constants";
import { authPost } from "./apiUtility";

export const keepDormitoryRoom = async (data) => {
  try {
    const requestBody = {
      buildingNumber: parseInt(data.buildingNumber, 10),
      roomNumber: parseInt(data.roomNumber, 10),
    };

    const responseData = await authPost(`${API_BASE_URL}/form/dormitory/keepRoom`, requestBody);

    return {
      formId: responseData.formId,
      ...responseData,
    };
  } catch (error) {
    console.error("Error submitting keep room request:", error);
    throw error;
  }
};

export const applyForDormitory = async (formData, keepRoomFormId = null) => {
  try {
    const requestBody = mapFormDataToDormitoryRequest(formData, keepRoomFormId);

    return await authPost(`${API_BASE_URL}/form/dormitory/apply`, requestBody);
  } catch (error) {
    console.error("Error submitting dormitory application:", error);
    throw error;
  }
};

const mapFormDataToDormitoryRequest = (formData, keepRoomFormId) => {
  const { personalInfo, dormitoryInfo, familyInfo } = formData;

  const nameParts = personalInfo.fullName.trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts[nameParts.length - 1] || "";
  const secondName = nameParts.length > 2 ? nameParts.slice(1, nameParts.length - 1).join(" ") : "";

  const familyMembers = [];

  if (familyInfo?.father?.name) {
    familyMembers.push({
      name: familyInfo.father.name,
      address: familyInfo.father.address || "",
      phoneNumber: familyInfo.father.phone || "",
      dateOfBirth: "", // Optional field
      familyMemberRelation: "FATHER",
    });
  }

  if (familyInfo?.mother?.name) {
    familyMembers.push({
      name: familyInfo.mother.name,
      address: familyInfo.mother.address || "",
      phoneNumber: familyInfo.mother.phone || "",
      dateOfBirth: "", // Optional field
      familyMemberRelation: "MOTHER",
    });
  }

  if (Array.isArray(familyInfo?.siblings)) {
    familyInfo.siblings.forEach((sibling) => {
      if (sibling.name) {
        familyMembers.push({
          name: sibling.name,
          address: sibling.address || "",
          phoneNumber: sibling.phone || "",
          dateOfBirth: "",
          familyMemberRelation: sibling.type === "brother" ? "BROTHER" : "SISTER",
        });
      }
    });
  }

  if (familyInfo?.spouse?.name) {
    familyMembers.push({
      name: familyInfo.spouse.name,
      address: familyInfo.spouse.address || "",
      phoneNumber: familyInfo.spouse.phone || "",
      dateOfBirth: "",
      familyMemberRelation: "SPOUSE",
    });
  }

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
