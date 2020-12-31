import { STUDENT_ID_LENGH, EMPLOYEE_ID_LENGH } from './../../constants/user';
import { IUserRequest } from './interfaces/user.interface';
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    getIdentity(data: IUserRequest): number {
        const { id } = data;
        const len = (id as any).length
        if(len < EMPLOYEE_ID_LENGH) {
            return 2;
        } else if(len === STUDENT_ID_LENGH) {
            return 1;
        }
        return 0;
    }
}