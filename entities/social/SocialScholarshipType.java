package com.example.persistence.entity.scholarship.social;

import lombok.Getter;

@Getter
public enum SocialScholarshipType {
    DISABLED_STUDENT("Студент с трайни увреждания"),
    ORPHAN_STUDENT("Несемеен студент без двама родители"),
    ONE_PARENT_DECEASED_ONE_DISABLED("Несемеен студент с починал родител и родител, който е с трайни увреждания"),
    BOTH_PARENTS_DISABLED("Студент с двама родители с трайни увреждания"),
    PARENT_WITH_CHILD_UNDER_6("Майки/Бащи на деца до 6 год. възраст"),
    CHILD_PROTECTION_MEASURE("Студент, който до пълнолетие са с предприета мярка за закрила по реда на ЗЗД");

    private final String displayName;

    SocialScholarshipType(String displayName) {
        this.displayName = displayName;
    }

}
