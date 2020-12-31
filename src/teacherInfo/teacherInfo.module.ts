import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherInfoController } from "./teacherInfo.controller";
import { TeacherInfoService } from "./teacherInfo.service";
import { TeacherInfo } from './tacherInfo.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([TeacherInfo])
    ],
    controllers: [ TeacherInfoController ],
    providers: [ TeacherInfoService ],
    exports: [ TeacherInfoService ]
})
export class TeacherInfoModule {}