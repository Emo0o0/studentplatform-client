package bg.tu_varna.sit.api.inputoutput.dormitory.apply;

import bg.tu_varna.sit.api.contract.OperationResponse;
import lombok.*;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DormitoryApplyResponse implements OperationResponse {
    private Boolean success;
}
