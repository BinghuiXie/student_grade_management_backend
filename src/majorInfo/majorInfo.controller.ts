import { Controller } from "@nestjs/common";
import { MajorInfoService } from "./majorInfo.service";

@Controller('major')
export class MajorInfoController {
    constructor(
        private readonly majorInfoServicel: MajorInfoService
    ) {}
}