import { CourseInfo } from './courseInfo.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { CollegeInfo } from 'src/collegeInfo/collegeInfo.entity';

@Injectable()
export class CourseInfoService {
    constructor(
        @InjectRepository(CourseInfo)
        private readonly courseInfoRepository: Repository<CourseInfo>
    ) {}

    async getCourseInfoList(): Promise<any> {
        const selectQuery = this.courseInfoRepository.createQueryBuilder('course')
            .select([
                'course.course_code as courseCode',
                'course.course_name as courseName',
                'course.course_material as courseMaterial',
                'course.examine_type as examineType',
                'course.course_credit as courseCredit',
                'college.college_name as collegeName'
            ])
            .leftJoin(CollegeInfo, 'college', 'college.id = course.college_id')
        const courseInfoList = await selectQuery.getRawMany();
        courseInfoList.forEach(item => {
            item.examineType = item.examineType === 1 ? '考试' : '考核';
        })
        return courseInfoList;
    }
}