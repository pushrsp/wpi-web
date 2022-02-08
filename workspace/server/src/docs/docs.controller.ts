import { Controller, Get, UseGuards } from "@nestjs/common";
import { DocsService } from "./docs.service";

import { AuthMiddleware } from "../shared/middlewares/auth.middleware";

@Controller("api/docs")
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @UseGuards(AuthMiddleware)
  @Get()
  getDocs() {
    return "docs";
  }
}
