import { StudentInfo } from './studentInfo.entity';
import { StudentInfoService } from './studentInfo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { StudentInfoController } from './studentInfo.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([StudentInfo])
    ],
    exports: [ StudentInfoService ],
    controllers: [StudentInfoController],
    providers: [ StudentInfoService ]
})
export class StudentInfoModule {}