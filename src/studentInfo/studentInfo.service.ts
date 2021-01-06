import { IUserRequest } from './../common/modules/user/interfaces/user.interface';
import { MajorInfo } from './../majorInfo/majorInfo.entity';
import { CollegeInfo } from './../collegeInfo/collegeInfo.entity';
import { StudentInfo } from './studentInfo.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { UserCode } from 'src/common/modules/user/code';
import { IStudentInfo } from './interface';

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
                'student.year as year',
                'student.password as password'
            ])
            .leftJoin(CollegeInfo, 'college', 'college.id = student.college_id')
            .leftJoin(MajorInfo, 'major', 'major.id = student.major_id')
        const studentInfoList = await selectQuery.getRawMany();
        studentInfoList.forEach(item => {
            item.gender = item.gender === 0 ? '男' : '女';
        });
        return studentInfoList;
    }

    public async getStudentInfoByStudentId(id: string): Promise<IStudentInfo> {
        let studentResp;
        const selectQuery = this.studentInfoRepository.createQueryBuilder('student')
            .select([
                'student.student_id as studentId',
                'student.name as name',
                'student.gender as gender',
                'college.college_name as collegeName',
                'major.major_name as majorName',
                'student.class as class',
                'student.nation as nation',
                'student.year as year',
                'student.password as password'
            ])
            .leftJoin(CollegeInfo, 'college', 'college.id = student.college_id')
            .leftJoin(MajorInfo, 'major', 'major.id = student.major_id')
            .where("student.student_id = :studentId", { studentId: id });
        try {
            studentResp = selectQuery.getRawOne();
            studentResp.gender = studentResp.gender === 0 ? '男' : '女';
         } catch (error) {
            throw new Error(`get student info item error: ${error}`)
        }
        return studentResp;
    }

    public async isStudentPasswordCorrect(studentInfo: IUserRequest): Promise<boolean | number> {
        const realStudentInfo = await this.getStudentInfoByStudentId(studentInfo.id);
        if(realStudentInfo.password === studentInfo.password) {
            return true;
        } else {
            return UserCode.WRONG_PASSWORD;
        }
    }
}