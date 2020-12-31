import { CourseInfoService } from './courseInfo.service';
import { Controller, Get } from '@nestjs/common';

@Controller('course')
export class CourseInfoController {
    constructor(
        private readonly courseInfoService: CourseInfoService
    ) {}

    @Get('list')
    public async getCourseInfoList() {
        return await this.courseInfoService.getCourseInfoList();
    }
}