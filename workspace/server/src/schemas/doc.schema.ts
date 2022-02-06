import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type DocDocument = Doc & Document;

@Schema()
export class Doc {
  _id: string;

  @Prop({ required: true, type: String })
  fileName: string;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  version: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const DocSchema = SchemaFactory.createForClass(Doc);
