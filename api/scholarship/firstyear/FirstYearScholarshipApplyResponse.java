package com.example.api.inputoutput.scholarship.firstyear;

import com.example.api.contract.OperationResponse;
import lombok.*;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FirstYearScholarshipApplyResponse implements OperationResponse {

    private Boolean success;
}
