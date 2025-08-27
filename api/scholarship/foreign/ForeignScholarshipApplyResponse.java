package com.example.api.inputoutput.scholarship.foreign;

import com.example.api.contract.OperationResponse;
import lombok.*;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ForeignScholarshipApplyResponse implements OperationResponse {

    private Boolean success;
}
