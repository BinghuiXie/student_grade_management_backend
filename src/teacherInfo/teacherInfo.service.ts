import { ITeacherInfo } from './interface/teacherInfo.interface';
import { IUserRequest } from './../common/modules/user/interfaces/user.interface';
import { CourseInfo } from './../courseInfo/courseInfo.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TeacherInfo } from "./tacherInfo.entity";
import { studentInfo } from 'src/mock/student-info';
import { UserCode } from 'src/common/modules/user/code';

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
                'teacher.political_affiliation as politicalAffiliation',
                'teacher.password as password'
            ])
            .leftJoin(CourseInfo, 'course', 'teacher.course_id = course.id');
        const teacherInfoList = await selectQuery.getRawMany();
        teacherInfoList.map(item => {
            item.gender = item.gender === 0 ? '男' : '女'
        });
        return teacherInfoList;
    }

    async getTeacherInfoByEmployeeId(employeeId: string): Promise<ITeacherInfo> {
        let teacherResp;
        const selectQuery = this.teacherInfoRepository.createQueryBuilder('teacher')
            .select([
                'teacher.employee_id as employeeId',
                'teacher.name as name',
                'teacher.gender as gender',
                'teacher.mail as mail',
                'teacher.phone as phone',
                'teacher.political_affiliation as politicalAffiliation',
                'teacher.password as password'
            ])
            .leftJoin(CourseInfo, 'course', 'teacher.course_id = course.id')
            .where("teacher.employee_id = :employeeId", { employeeId });
        try {
            teacherResp = await selectQuery.getRawOne();
            teacherResp.gender = teacherResp.gender === 0 ? '男' : '女';
        } catch (error) {
            throw new Error(`get teacher info item error: ${error}`);
        }
        return teacherResp;
    }

    /**
     * 修改教师数据
     * @param newData 修改后的新数据
     * @return 返回修改后的数据
     */
    async alterTeacherInfo(newData: any): Promise<ITeacherInfo> {
        let alteredItem;
        newData.gender = newData.gender === '男' ? 0 : 1;
        try {
            await this.teacherInfoRepository.createQueryBuilder()
            .update(TeacherInfo)
            .set({
                employeeId: newData.employeeId,
                name: newData.name,
                gender: newData.gender,
                mail: newData.mail,
                phone: newData.phone,
                politicalAffiliation: newData.politicalAffiliation
            })
            .where("employee_id = :employeeId", { employeeId: newData.employeeId })
            .execute();
            alteredItem = await this.getTeacherInfoByEmployeeId(newData.employeeId);
        } catch (error) {
            throw new Error(`alter teacher info error: ${error}`);
        }
        return alteredItem;
    }

    /**
     * 检查教师身份信息是否正确
     * @param { IUserRequest } teacherInfo 前端传过来的教师信息
     */
    public async isTeacherPasswordCorrect(teacherInfo: IUserRequest): Promise<boolean | number> {
        const realTeacherInfo = await this.getTeacherInfoByEmployeeId(teacherInfo.id);
        if(realTeacherInfo.password === teacherInfo.password) {
            return true;
        } else {
            return UserCode.WRONG_PASSWORD;
        }
    }
}