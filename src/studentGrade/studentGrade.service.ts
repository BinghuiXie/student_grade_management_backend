import { StudentInfo } from './../studentInfo/studentInfo.entity';
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseInfo } from "src/courseInfo/courseInfo.entity";
import { Repository } from "typeorm";
import { StudentGrade } from "./studentGrade.entity";
import { CourseInfoService } from 'src/courseInfo/courseInfo.service';

@Injectable()
export class StudentGradeService {
    constructor(
        @InjectRepository(StudentGrade)
        private readonly studentGradeRepository: Repository<StudentGrade>,
        @Inject('CourseInfoService') private readonly courseInfoService: CourseInfoService
    ) {}

    async getStudentGradeList(): Promise<any> {
        /** 根据成绩表里面的 course_id 在课程表里面选出对应的课程名称 */
        const selectQuery = await this.studentGradeRepository.createQueryBuilder('grade')
            .select([
                'grade.student_id as studentId',
                'grade.normal_grade as normalGrade', 
                'grade.makeup_grade as makeupGrade', 
                'grade.reset_grade as resetGrade', 
                'course.course_name as courseName',
                'student.name as name'
            ])
            .leftJoin(CourseInfo, 'course', 'grade.course_id = course.id')
            .leftJoin(StudentInfo, 'student', 'grade.student_id = student.student_id')
        const gradeList = await selectQuery.getRawMany();
        return gradeList;
    }

    async getStudentGradeByStudentIdAndCourse(studentId: string, courseName: string): Promise<StudentGrade> {
        const courseInfoItem = await this.courseInfoService.getCourseInfoItemByName(courseName);
        const selectQuery = await this.studentGradeRepository.createQueryBuilder('grade')
            .select([
                'grade.student_id as studentId',
                'grade.normal_grade as normalGrade', 
                'grade.makeup_grade as makeupGrade', 
                'grade.reset_grade as resetGrade', 
                'course.course_name as courseName',
                'student.name as name'
            ])
            .leftJoin(CourseInfo, 'course', 'grade.course_id = course.id')
            .leftJoin(StudentInfo, 'student', 'grade.student_id = student.student_id')
            .where("grade.student_id = :studentId", { studentId })
            .andWhere('grade.course_id = :courseId', { courseId: courseInfoItem.id })
        let resp;
        try {
            resp = await selectQuery.getRawOne();
        } catch (error) {
            throw new Error(`get student grade item failed: ${error}`);
        }
        return resp;
    }

    async alterStudentGrade(newData: any) {
        const courseInfoItem = await this.courseInfoService.getCourseInfoItemByName(newData.courseName);
        let alteredItem;
        try {
            await this.studentGradeRepository.createQueryBuilder()
            .update(StudentGrade)
            .set({
                studentId: newData.studentId,
                normalGrade: newData.normalGrade,
                makeupGrade: newData.makeupGrade,
                resetGrade: newData.resetGrade,
                courseId: courseInfoItem.id
            })
            .where("student_id = :student_id", { student_id: newData.studentId })
            .andWhere("course_id = :courseId", { courseId: courseInfoItem.id })
            .execute();
            alteredItem = await this.getStudentGradeByStudentIdAndCourse(newData.studentId, newData.courseName);
        } catch (error) {
            throw new Error(error);
        }
        return alteredItem;
    }
}