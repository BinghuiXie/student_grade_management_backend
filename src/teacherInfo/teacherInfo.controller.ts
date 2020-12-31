import { Controller, Get, Param, Body, Query } from "@nestjs/common";
import { TeacherInfoService } from "./teacherInfo.service";

@Controller('teacher')
export class TeacherInfoController {
    constructor(
        private readonly teacherInfoService: TeacherInfoService
    ) {}
}