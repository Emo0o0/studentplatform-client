package com.example.api.inputoutput.scholarship.foreign;

import com.example.api.contract.OperationRequest;
import com.example.api.inputoutput.scholarship.BankingInfoDTO;
import lombok.*;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ForeignScholarshipApplyRequest implements OperationRequest {
    private BankingInfoDTO bankingInfo;
}
