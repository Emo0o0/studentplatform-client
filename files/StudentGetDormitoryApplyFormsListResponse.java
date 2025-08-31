package bg.tu_varna.sit.api.inputoutput.student.getdormitoryforms;

import bg.tu_varna.sit.api.contract.OperationResponse;
import lombok.*;

import java.util.List;

@Getter
@Setter(AccessLevel.PRIVATE)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudentGetDormitoryApplyFormsListResponse implements OperationResponse {

    private List<StudentGetDormitoryApplyFormsResponse> forms;
}
