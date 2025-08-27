package com.example.api.inputoutput.scholarship.achievement.apply;

import com.example.api.contract.OperationRequest;
import com.example.api.inputoutput.scholarship.BankingInfoDTO;
import lombok.*;
@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AchievementScholarshipApplyRequest implements OperationRequest {
    private String achievementTopic;
    private BankingInfoDTO bankingInfo;
}
