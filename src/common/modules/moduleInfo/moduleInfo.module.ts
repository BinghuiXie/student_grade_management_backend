import { StudentGradeModule } from './../../../studentGrade/studentGrade.module';
import { StudentInfoModule } from './../../../studentInfo/studentInfo.module';
import { TeacherInfoModule } from './../../../teacherInfo/teacherInfo.module';
import { ModuleInfoController } from './moduleInfo.controller';
import { ModuleInfoService } from './moduleInfo.service';
import { Module } from "@nestjs/common";
import { CourseInfoModule } from 'src/courseInfo/courseInfo.module';

@Module({
    imports: [ TeacherInfoModule, StudentInfoModule, CourseInfoModule, StudentGradeModule ],
    providers: [ ModuleInfoService ],
    controllers: [ ModuleInfoController ]
})
export class ModuleInfoModule {}