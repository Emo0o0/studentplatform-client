package bg.tu_varna.sit.api.inputoutput.dormitory.apply;

import bg.tu_varna.sit.api.PersonalAcademicInfoDTO;
import bg.tu_varna.sit.api.contract.OperationRequest;
import lombok.*;

import java.util.List;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DormitoryApplyRequest implements OperationRequest {

    private PersonalAcademicInfoDTO personalAcademicInfo;
    private String degreeLevel;
    private int buildingNumber;
    private int roomNumber;
    private List<FamilyMemberDto> familyMembers;
    private Long keepRoomFormId;
}
