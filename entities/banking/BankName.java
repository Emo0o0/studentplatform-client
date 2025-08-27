package com.example.persistence.entity.scholarship.banking;

import lombok.Getter;

@Getter
public enum BankName {
    DSK("БАНКА ДСК АД"),
    EUROBANK("ЮРОБАНК БЪЛГАРИЯ АД"),
    INVESTBANK("ИНВЕСТБАНК АД"),
    ALLIANZ("АЛИАНЦ БАНК БЪЛГАРИЯ АД"),
    TBI("ТИ БИ АЙ БАНК ЕАД"),
    INTERNATIONAL_ASSET("ИНТЕРНЕШЪНЪЛ АСЕТ БАНК АД"),
    BULGARIAN_DEVELOPMENT("БЪЛГАРСКА БАНКА ЗА РАЗВИТИЕ ЕАД"),
    UNICREDIT("УНИКРЕДИТ БУЛБАНК АД"),
    UBB("ОБЕДИНЕНА БЪЛГАРСКА БАНКА АД"),
    FIRST_INVESTMENT("ПЪРВА ИНВЕСТИЦИОННА БАНКА АД"),
    CENTRAL_COOPERATIVE("ЦЕНРТАЛНА КООПЕРАТИВНА БАНКА АД"),
    BACB("БЪЛГАРО-АМЕРИКАНСКА КРЕДИТНА БАНКА АД"),
    PROCREDIT("ПРОКРЕДИТ БАНК БЪЛГАРИЯ ЕАД"),
    COMMERCIAL("ТЪРГОВСКА БАНКА АД"),
    TOKUDA("ТОКУДА БАНК АД"),
    TEXIMBANK("ТЕКСИМ БАНК АД"),
    MUNICIPAL("ОБЩИНСКА БАНКА АД"),
    OTHER("ДРУГА");

    private final String displayName;

    BankName(String displayName) {
        this.displayName = displayName;
    }

}
