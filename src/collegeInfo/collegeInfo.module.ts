import { CollegeInfoService } from './collegeInfo.service';
import { CollegeInfo } from './collegeInfo.entity';
import { Module } from "@nestjs/common";
import { CollegeInfoController } from './collegeInfo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([ CollegeInfo ])
    ],
    exports: [ CollegeInfoService ],
    controllers: [ CollegeInfoController ],
    providers: [ CollegeInfoService ]
})
export class CollegeInfoModule {}