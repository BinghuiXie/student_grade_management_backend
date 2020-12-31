import { StudentInfo } from './../studentInfo/studentInfo.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseInfo } from "src/courseInfo/courseInfo.entity";
import { Repository } from "typeorm";
import { StudentGrade } from "./studentGrade.entity";

@Injectable()
export class StudentGradeService {
    constructor(
        @InjectRepository(StudentGrade)
        private readonly studentGradeRepository: Repository<StudentGrade>
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

    async alterStudentGrade(newData: any) {
        const data = JSON.parse(newData);
        console.log(data);
        // const insertTask = this.studentGradeRepository.createQueryBuilder()
        //     .update(StudentInfo)
        //     .set({
        //         studentId: data.studentId,
        //         normalGrade: data.normalGrade,
        //         makeupGrade: data.makeupGrade,
        //         resetGrade: data.resetGrade,
        //     })
        //     .where("student_id = :student_id", { student_id: data.studentId })
        //     .execute();
    }
}