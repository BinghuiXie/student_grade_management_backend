import { CourseInfoService } from './courseInfo.service';
import { CourseInfoController } from './courseInfo.controller';
import { CourseInfo } from './courseInfo.entity';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([CourseInfo])],
    controllers: [ CourseInfoController ],
    providers: [ CourseInfoService ],
    exports: [CourseInfoService]
})
export class CourseInfoModule {}