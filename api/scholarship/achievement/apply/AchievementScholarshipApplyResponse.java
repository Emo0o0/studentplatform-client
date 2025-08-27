package com.example.api.inputoutput.scholarship.achievement.apply;

import com.example.api.contract.OperationResponse;
import lombok.*;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AchievementScholarshipApplyResponse implements OperationResponse {

    private Boolean success;
}
