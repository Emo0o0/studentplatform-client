package com.example.api.inputoutput.scholarship.meritincome;

import com.example.api.contract.OperationRequest;
import com.example.api.inputoutput.scholarship.BankingInfoDTO;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MeritIncomeScholarshipApplyRequest implements OperationRequest {

    private String familyStatus;

    //married
    private String spouseName;
    private String spouseEmploymentStatus;
    private List<ChildDTO> children = new ArrayList<>();

    //single
    private String fatherName;
    private String fatherStatus;
    private String motherName;
    private String motherStatus;
    private List<SiblingDTO> siblings = new ArrayList<>();

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

    private BankingInfoDTO bankingInfo;

}
