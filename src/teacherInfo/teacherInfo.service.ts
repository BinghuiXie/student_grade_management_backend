import { CourseInfo } from './../courseInfo/courseInfo.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TeacherInfo } from "./tacherInfo.entity";

@Injectable()
export class TeacherInfoService {
    constructor(
        @InjectRepository(TeacherInfo) 
        private readonly teacherInfoRepository: Repository<TeacherInfo>
    ) {}

    async getTeacherInfoList(): Promise<TeacherInfo[]> {
        const selectQuery = this.teacherInfoRepository.createQueryBuilder('teacher')
            .select([
                'teacher.employee_id as employeeId',
                'teacher.name as name',
                'teacher.gender as gender',
                'teacher.mail as mail',
                'teacher.phone as phone',
                'teacher.employee_id as employeeId',
                'teacher.political_affiliation as politicalAffiliation',
                'course.course_name as courseName'
            ])
            .leftJoin(CourseInfo, 'course', 'teacher.course_id = course.id');
        const teacherInfoList = await selectQuery.getRawMany();
        teacherInfoList.map(item => {
            item.gender = item.gender === 0 ? '男' : '女'
        });
        return teacherInfoList;
    }
}