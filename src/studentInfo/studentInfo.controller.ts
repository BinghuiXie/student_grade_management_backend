import { StudentInfoService } from './studentInfo.service';
import { Controller } from "@nestjs/common";

@Controller('student')
export class StudentInfoController {

    constructor(
        private readonly studentInfoService: StudentInfoService
    ) {}

}