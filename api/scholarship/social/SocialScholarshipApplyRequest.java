package com.example.api.inputoutput.scholarship.social;

import com.example.api.contract.OperationRequest;
import com.example.api.inputoutput.scholarship.BankingInfoDTO;
import lombok.*;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SocialScholarshipApplyRequest implements OperationRequest {
    private String socialType;
    private Boolean hasMarriage;
    private BankingInfoDTO bankingInfo;
}
