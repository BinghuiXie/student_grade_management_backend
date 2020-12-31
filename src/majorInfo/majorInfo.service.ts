import { MajorInfo } from './majorInfo.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class MajorInfoService {
    constructor(
        @InjectRepository(MajorInfo)
        private readonly majorInfoRepository: Repository<MajorInfo>
    ) {}

    public async getMajorInfoList() {
        return await this.majorInfoRepository.find();
    }
}