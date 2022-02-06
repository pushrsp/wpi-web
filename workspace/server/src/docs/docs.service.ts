import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Doc, DocDocument } from "../schemas/doc.schema";

@Injectable()
export class DocsService {
  constructor(@InjectModel(Doc.name) private readonly docModel: Model<DocDocument>) {}
}
