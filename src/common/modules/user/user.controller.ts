import { JWT_SECRET_KEY } from './../../constants/user';
import { getJWTtoken } from './../../../utlis/token.utli';
import { isNumber } from './../../../utlis/number.utli';
import { IUserRequest } from './interfaces/user.interface';
import { BadRequestException, Body, Controller, HttpCode, Post, Req, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserCode, UserMessage } from './code';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) {}

    /**
     * 处理用户登录 => 登陆流程
     * 1. 判断身份 0 => 教师 1 => 学生 2 => 管理员
     * 2. 判断用户是否存在(不包括管理员) => 不存在跳转到注册页面
     * 3. 根据身份验证密码是否正确 => 用户名用作判断是否存在该用户，不用做正误判断
     * 4. 正确 => 返回 token => 前端跳转路由(对应id)
     * 5. 错误 => 返回 error
     */
    @Post('login')
    @HttpCode(200)
    public async handleUserlogin(@Body() data: IUserRequest) {
        // 1. 判断用户身份
        const identity = this.userService.getIdentity(data);

        const userInfo = await this.userService.isUserExist(identity, data);
        if(!userInfo) {
            // 2. 用户不存在
            return {
                code: UserCode.USER_NOT_EXIT,
                message: UserMessage[UserCode.USER_NOT_EXIT]
            }
        }
        // 3. 验证用户密码是否正确
        const resp: number | boolean = await this.userService.checkUserPassword(identity, data);
        if(isNumber(resp)) {
            return {
                code: resp,
                message: UserMessage[resp as number]
            }
        }

        // 4./5. 登录成功，创建并返回 JWT，失败抛出 error
        let jwt: string;
        const payload = {
            identity,
            userId: userInfo.studentId || userInfo.employeeId
        }
        try {
            jwt = getJWTtoken(payload, JWT_SECRET_KEY)
        } catch (error) {
            throw new BadRequestException(`generate jwt failed: ${jwt}`);
        }
        
        return {
            code: UserCode.LOGIN_SUCCESS,
            message: UserMessage[UserCode.LOGIN_SUCCESS],
            token: jwt
        }
    }

    @Post('register')
    handleUserRegister() {

    }

}