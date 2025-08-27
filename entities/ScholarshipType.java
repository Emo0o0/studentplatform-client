package com.example.persistence.entity.scholarship;

import lombok.Getter;

@Getter
public enum ScholarshipType {

    MERIT_SUCCESS("Стипендия за успех (успех от 5.00 до 6.00)"),
    MERIT_WITH_INCOME("Стипендия за успех с доходи (успех от 4.00 до 4.99)"),
    SOCIAL_PREFERENTIAL("Стипендия (социална/предимствена) съгласно чл. 3, ал.3, т.1 и чл.3, ал.4"),
    FOREIGN_STUDENT("Стипендия за студенти приети по реда на ПМС №103 от 1993 год. и ПМС №228 от 1997 год."),
    FIRST_YEAR("Стипендия ПЪРВОКУРСНИК по чл.8б"),
    SPECIAL_ACHIEVEMENTS("Стипендия за специални постижения");

    private final String displayName;

    ScholarshipType(String displayName) {
        this.displayName = displayName;
    }
}
