package com.example.persistence.entity.scholarship;

import com.example.persistence.entity.PersonalAcademicInfo;
import com.example.persistence.entity.Student;
import com.example.persistence.entity.scholarship.achievement.SpecialAchievementScholarshipInfo;
import com.example.persistence.entity.scholarship.banking.BankingInfo;
import com.example.persistence.entity.scholarship.firstyear.FirstYearScholarshipInfo;
import com.example.persistence.entity.scholarship.foreign.ForeignStudentScholarshipInfo;
import com.example.persistence.entity.scholarship.merit.MeritScholarshipInfo;
import com.example.persistence.entity.scholarship.meritincome.MeritWithIncomeScholarshipInfo;
import com.example.persistence.entity.scholarship.social.SocialScholarshipInfo;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ScholarshipApplyForm {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long formId;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "personal_info_id")
    private PersonalAcademicInfo personalAcademicInfo;

    //успех от предходните 2 семестъра
    private Double previousGPA;

    @Enumerated(EnumType.STRING)
    private ScholarshipType scholarshipType;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "merit_scholarship_id")
    private MeritScholarshipInfo meritScholarshipInfo;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "merit_with_income_scholarship_id")
    private MeritWithIncomeScholarshipInfo meritWithIncomeInfo;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "social_scholarship_id")
    private SocialScholarshipInfo socialScholarshipInfo;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "first_year_scholarship_id")
    private FirstYearScholarshipInfo firstYearScholarshipInfo;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "foreign_student_scholarship_id")
    private ForeignStudentScholarshipInfo foreignStudentScholarshipInfo;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "special_achievment_scholarship_id")
    private SpecialAchievementScholarshipInfo specialAchievementScholarshipInfo;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "banking_info_id")
    private BankingInfo bankingInfo;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @CreationTimestamp
    private LocalDateTime date;

}
