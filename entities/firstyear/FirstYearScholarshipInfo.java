package com.example.persistence.entity.scholarship.firstyear;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class FirstYearScholarshipInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Enumerated(EnumType.STRING)
    private ProfessionalDirection professionalDirection;
    private Double bulgarianLanguageGrade;
    private String secondExamSubject;
    private Double secondExamGrade;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id")
    private List<FirstYearDocument> firstYearDocuments = new ArrayList<>();
}
