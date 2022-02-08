import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Doc, DocSchema } from "../schemas/doc.schema";

import { CommonModule } from "../common/common.module";

import { DocsController } from "./docs.controller";
import { DocsService } from "./docs.service";

@Module({
  imports: [CommonModule, MongooseModule.forFeature([{ name: Doc.name, schema: DocSchema }])],
  controllers: [DocsController],
  providers: [DocsService],
})
export class DocsModule {}
