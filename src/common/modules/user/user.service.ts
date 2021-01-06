import { StudentInfoService } from './../../../studentInfo/studentInfo.service';
import { TeacherInfoService } from './../../../teacherInfo/teacherInfo.service';
import { STUDENT_ID_LENGH, EMPLOYEE_ID_LENGH } from './../../constants/user';
import { IUserRequest, UserIdentity } from './interfaces/user.interface';
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class UserService {

    constructor(
        @Inject('TeacherInfoService') private readonly teacherInfoService: TeacherInfoService,
        @Inject('StudentInfoService') private readonly studentInfoService: StudentInfoService
    ) {}

    public getIdentity(data: IUserRequest): number {
        const { id } = data;
        const len = (id as any).length
        if(len < EMPLOYEE_ID_LENGH) {
            return 2;
        } else if(len === STUDENT_ID_LENGH) {
            return 1;
        }
        return 0;
    }

    public async isUserExist(identity: number, data: IUserRequest): Promise<any> {
        let userInfo;
        if(identity === UserIdentity.STUDENT) {
            // 学生 => 1
            userInfo = await this.studentInfoService.getStudentInfoByStudentId(data.id);
        } else {
            // 教师 => 0
            userInfo = await this.teacherInfoService.getTeacherInfoByEmployeeId(data.id);
        }
        return userInfo;
    }

    public async checkUserPassword(identity: number, data: IUserRequest): Promise<boolean | number> {
        let resp: boolean | number = false;
        if(identity === UserIdentity.STUDENT) {
            resp = await this.studentInfoService.isStudentPasswordCorrect(data);
        } else {
            resp = await this.teacherInfoService.isTeacherPasswordCorrect(data);
        }
        return resp;
    }
}