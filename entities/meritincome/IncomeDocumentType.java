package com.example.persistence.entity.scholarship.meritincome;

import lombok.Getter;

@Getter
public enum IncomeDocumentType {
    EMPLOYMENT_NOTE("Служебна бележка от работодател"),
    SCHOOL_NOTE("Служебна бележка от училище/университет"),
    CHILD_ALLOWANCE_NOTE("Служебна бележка, месечни помощи за деца до 2 год. възраст"),
    PENSION_NOTE("Бележка за получени пенсии"),
    UNEMPLOYMENT_NOTE("Безработни родители, които не получават обезщетение от Бюрото по Труда"),
    FAMILY_ALLOWANCE_NOTE("Служебна бележка семейни добавки"),
    DIVORCE_COURT_DECISION("Копие от решение на съда по бракоразводното дело"),
    OTHER_SCHOLARSHIPS("Документ за други доходи от стипендии"),
    OTHER_INCOME("Бележка за получени други доходи"),
    NO_INCOME_DECLARATION("Нотариално заверена клетвена декларация");

    private final String displayName;

    IncomeDocumentType(String displayName) {
        this.displayName = displayName;
    }

}
