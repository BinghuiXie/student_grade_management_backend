import { ModuleInfoService } from './moduleInfo.service';
import { Controller, Get, HttpCode, Post, Query, Req } from "@nestjs/common";

@Controller('module')
export class ModuleInfoController {
    constructor(
        private readonly moduleInfoService: ModuleInfoService,
    ) {}

    @Get('list')
    public async getModuleDataList(
        @Query() query: { module: number },
        @Req() req: any) {
        const { module } = query;
        console.log('req.headers: ', req.headers);
        return await this.moduleInfoService.getModuleData(+module);
    }

    @Post('alter')
    @HttpCode(200)
    public async alterModuleInfo(@Query('module') moduleId: string, @Query('newModuleData') data: any) {
        return await this.moduleInfoService.alterModuleData(+moduleId, data)
    }
}