import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { DocsService } from "./docs.service";
import { FileInterceptor } from "@nestjs/platform-express";

import { AuthMiddleware } from "../shared/middlewares/auth.middleware";
import { Token } from "../shared/decorators/token.decorator";
import { multerDiskOptions } from "./multer/multer.option";
import { RequestDocDto } from "./dto/request.doc.dto";

@Controller("docs")
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Get()
  @UseGuards(AuthMiddleware)
  async getDocs() {
    return await this.docsService.getDocs();
  }

  @Get(":_id")
  @UseGuards(AuthMiddleware)
  async getTheDoc(@Param() params) {
    return await this.docsService.getTheDoc(params._id);
  }

  @Post()
  @UseGuards(AuthMiddleware)
  @UseInterceptors(FileInterceptor("file", multerDiskOptions))
  async createDoc(@Token() user, @UploadedFile() file: Express.Multer.File, @Body() data: RequestDocDto) {
    return await this.docsService.createDoc(file.filename, data.title, data.version);
  }

  @Patch()
  @UseGuards(AuthMiddleware)
  async updateTheDoc(@Body() data: RequestDocDto) {
    return await this.docsService.updateTheDoc(data._id, data.title, data.version);
  }
}
