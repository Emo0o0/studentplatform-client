package com.example.api.inputoutput.scholarship.meritincome;

import com.example.api.contract.OperationResponse;
import lombok.*;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MeritIncomeScholarshipApplyResponse implements OperationResponse {

    private Boolean success;
}
