import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as fs from "fs";

import { Doc, DocDocument } from "../schemas/doc.schema";

@Injectable()
export class DocsService {
  constructor(@InjectModel(Doc.name) private readonly docModel: Model<DocDocument>) {}

  async getDocs() {
    return await this.docModel.find();
  }

  async getTheDoc(_id: string) {
    const doc = await this.docModel.findOne({ _id });
    if (!doc) throw new BadRequestException("파일이 존재하지 않습니다.");

    const file = fs.readFileSync(`${process.cwd()}/uploads/${doc.fileName}`);
    return { wpi: JSON.parse(file.toString()), info: doc };
  }

  async createDoc(fileName: string, title: string, version: string): Promise<string> {
    if (!title || !version || !fileName) throw new BadRequestException("빈 칸이 있는지 확인해주세요.");

    const doc = await this.docModel.create({ title, fileName, version });
    if (!doc) throw new BadRequestException("빈 칸이 있는지 확인해주세요.");

    return doc._id;
  }

  async updateTheDoc(_id: string, title: string, version: string, fileName: string) {
    await this.docModel.updateOne({ _id }, { title, version, updatedAt: new Date(), fileName });
    return "ok";
  }
}
