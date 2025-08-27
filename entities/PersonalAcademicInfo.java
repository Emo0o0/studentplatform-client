package com.example.persistence.entity;

import com.example.persistence.entity.enums.CourseYear;
import com.example.persistence.entity.enums.DegreeLevel;
import com.example.persistence.entity.enums.Faculty;
import com.example.persistence.entity.enums.Semester;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class PersonalAcademicInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    //personal info
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
    @Enumerated(EnumType.STRING)
    private CourseYear courseYear;
    @Enumerated(EnumType.STRING)
    private Semester semester;
    @Enumerated(EnumType.STRING)
    private DegreeLevel degreeLevel;
    @Enumerated(EnumType.STRING)
    private StudentStatus studentStatus;
    @Enumerated(EnumType.STRING)
    private Faculty faculty;
    private String department;
    private String specialty;
    private Integer studentGroup;
    private Character subGroup;

}
