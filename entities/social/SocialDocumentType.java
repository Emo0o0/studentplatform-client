package com.example.persistence.entity.scholarship.social;

import lombok.Getter;

@Getter
public enum SocialDocumentType {
    TELK_DECISION("Решение на ТЕЛК"),
    INHERITANCE_ACT("Акт за наследници"),
    CHILD_BIRTH_CERTIFICATE("Акт за раждане на детето"),
    SWORN_DECLARATION("Клетвена декларация"),
    MARRIAGE_CERTIFICATE("Копие от свидетелството за сключен брак"),
    PROTECTION_DOCUMENT("Документ/удостоверение");

    private final String displayName;

    SocialDocumentType(String displayName) {
        this.displayName = displayName;
    }

}
