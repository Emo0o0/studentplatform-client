package com.example.api.inputoutput.scholarship.merit;

import com.example.api.contract.OperationResponse;
import lombok.*;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MeritScholarshipApplyResponse implements OperationResponse {

    private Boolean success;
}
