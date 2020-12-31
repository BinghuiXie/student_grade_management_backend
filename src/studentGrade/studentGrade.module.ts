import { StudentGradeController } from './studentGrade.controller';
import { StudentGradeService } from './studentGrade.service';
import { StudentGrade } from './studentGrade.entity';
import { Module } from "@nestjs/common"; 
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [ TypeOrmModule.forFeature([ StudentGrade ]) ],
    exports: [ StudentGradeService ],
    controllers: [ StudentGradeController ],
    providers: [ StudentGradeService ]
})
export class StudentGradeModule {}