package com.example.api;

import lombok.*;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PersonalAcademicInfoDTO {
    private String email;
    private String firstName;
    private String secondName;
    private String lastName;
    private String egn;
    private String address;
    private String phoneNumber;
    private String placeOfResidence;
    private String streetName;
    private Integer streetNumber;
    private String entrance;
    private Integer floor;
    private Integer flatNumber;
    //academic info
    private String facultyNumber;
    private String courseYear;
    private String semester;
    private String degreeLevel;
    private String faculty;
    private String specialty;
    private Integer studentGroup;
    private Character subGroup;
}
