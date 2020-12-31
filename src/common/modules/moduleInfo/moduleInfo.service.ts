import { StudentGradeService } from './../../../studentGrade/studentGrade.service';
import { StudentInfoService } from './../../../studentInfo/studentInfo.service';
import { TeacherInfoService } from './../../../teacherInfo/teacherInfo.service';
import { Inject, Injectable } from "@nestjs/common";
import { clone, omit } from '../../../utlis';
import { CourseInfoService } from 'src/courseInfo/courseInfo.service';

@Injectable()
export class ModuleInfoService {
    constructor(
        @Inject('TeacherInfoService') private readonly teacherInfoService: TeacherInfoService,
        @Inject('StudentInfoService') private readonly studentInfoService: StudentInfoService,
        @Inject('CourseInfoService') private readonly courseInfoService: CourseInfoService,
        @Inject('StudentGradeService') private readonly studentGradeService: StudentGradeService
    ) {}

    async getModuleData(id: number): Promise<any[]> {
        let res;
        switch (id) {
            case 0:
                // 获取所有成绩信息
                res = await this.studentGradeService.getStudentGradeList();
                break;
            case 2:
                // 获取所有教师信息
                res = await this.teacherInfoService.getTeacherInfoList();
                break;
            case 3:
                // 获取所有学生信息
                res = await this.studentInfoService.getStudentInfoList();
                break;
            case 4:
                // 获取所有课程信息
                res = await this.courseInfoService.getCourseInfoList();
                break;
            default:
                // 默认是空数组
                res = [];
        }
        return res;
    }

    async alterModuleData(id: number, newData: any) {
        switch (id) {
            case 0:
                await this.studentGradeService.alterStudentGrade(newData);
                break;
            case 2:
                await this.teacherInfoService
                break;
            case 3:
                await this.studentInfoService
                break;
            case 4:
                await this.courseInfoService
                break;
            default:

        }
    }
}