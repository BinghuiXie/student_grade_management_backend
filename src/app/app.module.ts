import { LoggerInterceptor } from './../common/providers/logger.interceptor';
import { CollegeInfoModule } from './../collegeInfo/collegeInfo.module';
import { MajorInfo } from './../majorInfo/majorInfo.entity';
import { CollegeInfo } from './../collegeInfo/collegeInfo.entity';
import { StudentGradeModule } from './../studentGrade/studentGrade.module';
import { CourseInfoModule } from './../courseInfo/courseInfo.module';
import { ModuleInfoModule } from './../common/modules/moduleInfo/moduleInfo.module';
import { TeacherInfoModule } from './../teacherInfo/teacherInfo.module';
import { UserModule } from './../common/modules/user/user.module';
import * as config from 'config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { clone } from '../utlis';
import { TeacherInfo } from 'src/teacherInfo/tacherInfo.entity';
import { StudentInfo } from 'src/studentInfo/studentInfo.entity';
import { CourseInfo } from 'src/courseInfo/courseInfo.entity';
import { StudentGrade } from 'src/studentGrade/studentGrade.entity';
import { MajorInfoModule } from 'src/majorInfo/majorInfo.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...clone(config.get('studentGradeManagement')),
      type: 'mysql',
      entities: [ 
        TeacherInfo, 
        StudentInfo, 
        CourseInfo,
        StudentGrade,
        CollegeInfo,
        MajorInfo
       ]
    }),
    UserModule,
    TeacherInfoModule,
    ModuleInfoModule,
    CourseInfoModule,
    StudentGradeModule,
    MajorInfoModule,
    CollegeInfoModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor
    }
  ],
})
export class AppModule {}
