package bg.tu_varna.sit.api.inputoutput.student.getdormitoryforms;

import lombok.*;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FamilyMemberDTO {

    private String name;
    private String address;
    private String phoneNumber;
    private String dateOfBirth;
    private String familyMemberRelation;
}
