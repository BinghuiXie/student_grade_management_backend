import { ModuleInfoService } from './moduleInfo.service';
import { Controller, Get, Post, Query } from "@nestjs/common";

@Controller('module')
export class ModuleInfoController {
    constructor(
        private readonly moduleInfoService: ModuleInfoService,
    ) {}

    @Get('list')
    public async getModuleDataList(@Query() query: { module: number }) {
        const { module } = query;
        console.log(typeof module, module);
        return await this.moduleInfoService.getModuleData(+module);
    }

    @Post('alter')
    public async alterModuleInfo(@Query('module') moduleId: string, @Query('newModuleData') data: any) {
        await this.moduleInfoService.alterModuleData(+moduleId, data)
    }
}