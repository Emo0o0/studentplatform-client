package com.example.api.inputoutput.scholarship.merit;

import com.example.api.contract.OperationRequest;
import com.example.api.inputoutput.scholarship.BankingInfoDTO;
import lombok.*;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MeritScholarshipApplyRequest implements OperationRequest {
    private BankingInfoDTO bankingInfo;
}
