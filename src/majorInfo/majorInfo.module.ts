import { MajorInfoService } from './majorInfo.service';
import { MajorInfo } from './majorInfo.entity';
import { Module } from "@nestjs/common";
import { MajorInfoController } from './majorInfo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [ 
        TypeOrmModule.forFeature([MajorInfo])
     ],
     exports: [ MajorInfoService ],
     providers: [ MajorInfoService ],
     controllers: [MajorInfoController]
})
export class MajorInfoModule {}