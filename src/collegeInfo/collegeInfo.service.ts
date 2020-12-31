import { CollegeInfo } from './collegeInfo.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class CollegeInfoService {
    constructor(
        @InjectRepository(CollegeInfo)
        private readonly collegeInfoRepository: Repository<CollegeInfo>
    ) {}

    public async getCollegeInfoList() {
        return await this.collegeInfoRepository.find();
    }
}