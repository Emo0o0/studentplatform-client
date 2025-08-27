package com.example.api.inputoutput.scholarship.firstyear;

import com.example.api.contract.OperationRequest;
import com.example.api.inputoutput.scholarship.BankingInfoDTO;
import lombok.*;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FirstYearScholarshipApplyRequest implements OperationRequest {
    private String professionalDirection;
    private Double bulgarianLanguageGrade;
    private String secondExamSubject;
    private Double secondExamGrade;
    private BankingInfoDTO bankingInfo;
}
