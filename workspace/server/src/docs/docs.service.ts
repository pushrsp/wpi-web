import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Doc, DocDocument } from "../schemas/doc.schema";

@Injectable()
export class DocsService {
  constructor(@InjectModel(Doc.name) private readonly docModel: Model<DocDocument>) {}

  async createDoc(fileName: string, title: string, version: string): Promise<string> {
    if (!title || !version || !fileName) throw new BadRequestException("빈 칸이 있는지 확인해주세요.");

    const doc = await this.docModel.create({ title, fileName, version });
    if (!doc) throw new BadRequestException("빈 칸이 있는지 확인해주세요.");

    return doc._id;
  }
}
