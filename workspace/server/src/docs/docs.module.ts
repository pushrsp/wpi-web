import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Doc, DocSchema } from "../schemas/doc.schema";

import { DocsController } from "./docs.controller";
import { DocsService } from "./docs.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Doc.name, schema: DocSchema }])],
  controllers: [DocsController],
  providers: [DocsService],
})
export class DocsModule {}
