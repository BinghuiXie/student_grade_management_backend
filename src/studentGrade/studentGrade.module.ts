import { StudentGradeController } from './studentGrade.controller';
import { StudentGradeService } from './studentGrade.service';
import { StudentGrade } from './studentGrade.entity';
import { Module } from "@nestjs/common"; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseInfoModule } from 'src/courseInfo/courseInfo.module';

@Module({
    imports: [ 
        TypeOrmModule.forFeature([ StudentGrade ]),
        CourseInfoModule
    ],
    exports: [ StudentGradeService ],
    controllers: [ StudentGradeController ],
    providers: [ StudentGradeService ]
})
export class StudentGradeModule {}