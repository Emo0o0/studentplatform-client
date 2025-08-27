package com.example.persistence.entity.scholarship.firstyear;

import lombok.Getter;

@Getter
public enum ProfessionalDirection {
    MECHANICAL_ENGINEERING("5.1. Машинно инженерство"),
    ELECTRICAL_ELECTRONICS("5.2. Електротехника, електроника и автоматика"),
    ENERGY("5.4. Енергетика"),
    TRANSPORT_NAVAL("5.5. Транспорт, корабоплаване и авиация"),
    GENERAL_ENGINEERING("5.13. Общо инженерство");

    private final String displayName;

    ProfessionalDirection(String displayName) {
        this.displayName = displayName;
    }

}
