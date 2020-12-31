import { MajorInfo } from './../majorInfo/majorInfo.entity';
import { CollegeInfo } from './../collegeInfo/collegeInfo.entity';
import { StudentInfo } from './studentInfo.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class StudentInfoService {

    constructor(
        @InjectRepository(StudentInfo)
        private readonly studentInfoRepository: Repository<StudentInfo>
    ) {}

    public async getStudentInfoList(): Promise<StudentInfo[]> {
        const selectQuery = this.studentInfoRepository.createQueryBuilder('student')
            .select([
                'student.student_id as studentId',
                'student.name as name',
                'student.gender as gender',
                'college.college_name as collegeName',
                'major.major_name as majorName',
                'student.class as class',
                'student.nation as nation',
                'student.year as year'
            ])
            .leftJoin(CollegeInfo, 'college', 'college.id = student.college_id')
            .leftJoin(MajorInfo, 'major', 'major.id = student.major_id')
        const studentInfoList = await selectQuery.getRawMany();
        studentInfoList.forEach(item => {
            item.gender = item.gender === 0 ? '男' : '女';
        });
        return studentInfoList;
    }
}