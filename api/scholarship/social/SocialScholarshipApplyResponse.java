package com.example.api.inputoutput.scholarship.social;

import com.example.api.contract.OperationResponse;
import lombok.*;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SocialScholarshipApplyResponse implements OperationResponse {

    private Boolean success;
}
