package bg.tu_varna.sit.api.inputoutput.dormitory.apply;

import bg.tu_varna.sit.persistence.entity.enums.FamilyMemberRelation;
import lombok.*;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FamilyMemberDto {

    private String name;
    private String address;
    private String phoneNumber;
    private String dateOfBirth;
    private FamilyMemberRelation familyMemberRelation;
}
