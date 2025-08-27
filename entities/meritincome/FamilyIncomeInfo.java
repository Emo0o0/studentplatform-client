package com.example.persistence.entity.scholarship.meritincome;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class FamilyIncomeInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    //married
    private String spouseName;
    private String spouseEmploymentStatus;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id")
    private List<Child> children = new ArrayList<>();

    //single
    private String fatherName;
    private String fatherStatus;
    private String motherName;
    private String motherStatus;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id")
    private List<Sibling> siblings = new ArrayList<>();

    // Income
    private BigDecimal salaries = BigDecimal.ZERO;
    private BigDecimal pensions = BigDecimal.ZERO;
    private BigDecimal unemploymentBenefits = BigDecimal.ZERO;
    private BigDecimal socialAid = BigDecimal.ZERO;
    private BigDecimal familyAllowances = BigDecimal.ZERO;
    private BigDecimal childCareAllowances = BigDecimal.ZERO;
    private BigDecimal personalScholarships = BigDecimal.ZERO;
    private BigDecimal rent = BigDecimal.ZERO;
    private BigDecimal honorariums = BigDecimal.ZERO;
    private BigDecimal alimony = BigDecimal.ZERO;
    private BigDecimal businessIncome = BigDecimal.ZERO;
    private BigDecimal otherIncome = BigDecimal.ZERO;
    private BigDecimal totalIncome = BigDecimal.ZERO;
    private BigDecimal monthlyIncomePerMember = BigDecimal.ZERO;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id")
    private List<IncomeDocument> incomeDocuments = new ArrayList<>();

}
