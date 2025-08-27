package com.example.api.inputoutput.scholarship;

import com.example.persistence.entity.scholarship.banking.BankName;
import lombok.*;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BankingInfoDTO {

    private BankName bankName;
    private String bankAccount;
}
