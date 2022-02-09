import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { DocsService } from "./docs.service";
import { FileInterceptor } from "@nestjs/platform-express";

import { AuthMiddleware } from "../shared/middlewares/auth.middleware";
import { RoleMiddleware } from "../shared/middlewares/role.middleware";
import { Roles } from "../shared/enum/roles.enum";
import { Token } from "../shared/decorators/token.decorator";
import { multerDiskOptions } from "./multer/multer.option";
import { RequestDocDto } from "./dto/request.doc.dto";

@Controller("api/docs")
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Get()
  @UseGuards(AuthMiddleware)
  getDocs() {
    return "docs";
  }

  @Post()
  @UseGuards(AuthMiddleware, new RoleMiddleware(Roles.ADMIN, Roles.WRITE))
  @UseInterceptors(FileInterceptor("file", multerDiskOptions))
  async createDoc(@Token() user, @UploadedFile() file: Express.Multer.File, @Body() data: RequestDocDto) {
    return await this.docsService.createDoc(file.filename, data.title, data.version);
  }
}
