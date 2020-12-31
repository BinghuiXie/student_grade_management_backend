/**
 * @description 处理用户登陆注册模块
 */

import { Module } from "@nestjs/common";
import { UserController } from './user.controller';
import { UserService } from "./user.service";

 @Module({
     controllers: [UserController],
     providers: [UserService]
 })
 export class UserModule {}