package bg.tu_varna.sit.api.inputoutput.dormitory.keeproom;

import bg.tu_varna.sit.api.contract.OperationRequest;
import lombok.*;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DormitoryKeepRoomRequest implements OperationRequest {
    private int buildingNumber;
    private int roomNumber;
}
