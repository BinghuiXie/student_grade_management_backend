import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) {}

    /**
     * 处理用户登录 => 登陆流程
     * 1. 判断身份 0 学生 1 教师 2 管理员
     * 2. 判断用户是否存在(不包括管理员)
     * 3. 根据身份验证用户名和密码是否正确
     * 4. 正确 => 返回 token => 前端跳转路由(对应id)
     * 5. 错误 => 返回 error
     */
    @Post('login')
    handleUserlogin(@Body() data) {
        const identity = this.userService.getIdentity(data);
        
    }

    @Post('register')
    handleUserRegister() {

    }

    @Get('login')
    getHelloQ() {
        return 'aaa'
    }
}